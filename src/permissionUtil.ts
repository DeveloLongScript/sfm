export default function findPermissions(permissions: string): Permission[] {
    var list: Permission[] = [];
    if (permissions.includes("A")) {
        // admin perm:
        // * all permissions (RWST)
        // * admin panel perm
        list.push(Permission.Admin)
    }
    if (permissions.includes("R")) {
        // can read files
        list.push(Permission.Read)
    }
    if (permissions.includes("W")) {
        // can write files
        list.push(Permission.Write)
    }
    if (permissions.includes("S")) {
        // can see files (without you are required to login with a different account (or to generally *sign-in* if not already))
        list.push(Permission.See)
    }
    if (permissions.includes("T")) {
        // can open a root terminal (provided with sudo pass)
        list.push(Permission.Terminal)
    }
    return list;
}

export enum Permission {
    Admin, Read, Write, See, Terminal
}