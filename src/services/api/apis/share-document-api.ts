/* tslint:disable */
/* eslint-disable */
/**
 * DIXA API
 * Project DIXA API, documentation management
 *
 * OpenAPI spec version: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { InlineResponse20011 } from '../models';
import { InlineResponse400 } from '../models';
import { InlineResponse401 } from '../models';
import { InlineResponse403 } from '../models';
import { InlineResponse404 } from '../models';
import { InlineResponse422 } from '../models';
/**
 * ShareDocumentApi - axios parameter creator
 * @export
 */
export const ShareDocumentApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Get the list of all permission to share document in a single request
         * @summary List - Share Document Permissions
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listShareDocumentPermissions: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/share-permissions`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearerAuth required

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ShareDocumentApi - functional programming interface
 * @export
 */
export const ShareDocumentApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Get the list of all permission to share document in a single request
         * @summary List - Share Document Permissions
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listShareDocumentPermissions(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20011>> {
            const localVarAxiosArgs = await ShareDocumentApiAxiosParamCreator(configuration).listShareDocumentPermissions(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * ShareDocumentApi - factory interface
 * @export
 */
export const ShareDocumentApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Get the list of all permission to share document in a single request
         * @summary List - Share Document Permissions
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listShareDocumentPermissions(options?: any): AxiosPromise<InlineResponse20011> {
            return ShareDocumentApiFp(configuration).listShareDocumentPermissions(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ShareDocumentApi - object-oriented interface
 * @export
 * @class ShareDocumentApi
 * @extends {BaseAPI}
 */
export class ShareDocumentApi extends BaseAPI {
    /**
     * Get the list of all permission to share document in a single request
     * @summary List - Share Document Permissions
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ShareDocumentApi
     */
    public listShareDocumentPermissions(options?: any) {
        return ShareDocumentApiFp(this.configuration).listShareDocumentPermissions(options).then((request) => request(this.axios, this.basePath));
    }
}