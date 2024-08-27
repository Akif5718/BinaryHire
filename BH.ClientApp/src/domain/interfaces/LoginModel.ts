export interface ILoginResponse{
    userId: number,
    userName: string,
    token:  string,
    organizationId: number,
    organizationName: string,
    userRoleId: number,
    userRoleName: string
}

export interface ILoginRequest{
    userName: string,
    password: string
}