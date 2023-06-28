export default function findPermissions(permissions: string): Permission[] {
    var list: Permission[] = [];
    if (permissions.includes("A")) {
        list.push(Permission.Admin)
    }
    if (permissions.includes("R")) {
        list.push(Permission.Read)
    }
    if (permissions.includes("W")) {
        list.push(Permission.Write)
    }
    if (permissions.includes("S")) {
        list.push(Permission.See)
    }
    if (permissions.includes("T")) {
        list.push(Permission.Terminal)
    }
    return list;
}

export enum Permission {
    Admin, Read, Write, See, Terminal
}