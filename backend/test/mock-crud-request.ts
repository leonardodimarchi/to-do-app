import { CrudRequest } from "@nestjsx/crud";

export const mockedCrudRequest: CrudRequest = {
    options: {},
    parsed: {
        authPersist: jest.fn(),
        includeDeleted: 0,
        limit: 100,
        offset: 0,
        page: 1,
        search: {},
        sort: [],
        paramsFilter: [],
        or: [],
        join: [],
        filter: [],
        fields: [],
        cache: 0,
    },
}