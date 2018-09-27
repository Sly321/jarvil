import { isAbsolute, sep, resolve } from "path"
import { mkdirSync } from "fs"

export default class FileSystem {

    /**
     *
     *
     * @static
     * @param {string} targetDir
     * @returns
     * @memberof FileSystem
     */
    public static MakeDirRecursively(targetDir: string) {
        const initDir = isAbsolute(targetDir) ? sep : ''
        const baseDir = '.'

        return targetDir.split(sep).reduce((parentDir, childDir) => {
            const curDir = resolve(baseDir, parentDir, childDir);
            try {
                mkdirSync(curDir);
            } catch (err) {
                if (err.code === 'EEXIST') { // curDir already exists!
                    return curDir;
                }

                // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
                if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
                    throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
                }

                const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
                if (!caughtErr || caughtErr && targetDir === curDir) {
                    throw err; // Throw if it's just the last created dir.
                }
            }

            return curDir;
        }, initDir);
    }
}