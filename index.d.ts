declare module 'hardhat-cli-utils' {
    export const AllAvailableTasks: Set<string>;
    export function register(tasks: string[] | Set<string>, prefix?: string);
    export function registerExcluding(tasks: string[] | Set<string>, prefix?: string);
    export function registerAll(prefix?: string);
}
