import { isAbsolute, sep, resolve, dirname } from "path"
import { mkdirSync } from "fs"
import { homedir } from "os"

export enum FileType {
    Unknown = "filetype/unknown",
    JavaScript = "filetype/javascript",
    TypeScript = "filetype/typescript"
}

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

    public static getFileType(file: string): FileType {
        if (file.endsWith(".js")) {
            return FileType.JavaScript
        } else if (file.endsWith(".ts")) {
            return FileType.TypeScript
        }
        return FileType.Unknown
    }

    /**
     * Returns the home directory of the current user in production mode, else the root of this project.
     *
     * @static
     * @returns {string}
     * @memberof FileSystem
     */
    public static getHomeDirectory(): string {
        console.debug("env", process.env.NODE_ENV)
        return process.env.NODE_ENV === "development" ? resolve(dirname(require.main.filename), "..", "..", "local-config") : homedir()
    }
}