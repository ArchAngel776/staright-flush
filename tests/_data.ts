export interface GlobalData
{
    log: jest.SpyInstance<void, Array<string>>
}

export const data: GlobalData = {
    log: jest.spyOn(console, "log")
}