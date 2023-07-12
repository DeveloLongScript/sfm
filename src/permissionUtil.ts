export default function findPermissions(permissions: string): Permission[] {
    var list: Permission[] = [];
    if (permissions.includes("A")) {
        // admin perm:
        // * all permissions (RWT)
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
    if (permissions.includes("T")) {
        // can open a root terminal (provided with sudo pass)
        list.push(Permission.Terminal)
    }
    return list;
}

export enum Permission {
    Admin, Read, Write, Terminal
}