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
/**
 * 
 * @export
 * @interface ShareDocumentPermission
 */
export interface ShareDocumentPermission {
    /**
     * 
     * @type {number}
     * @memberof ShareDocumentPermission
     */
    id?: any;
    /**
     * 
     * @type {string}
     * @memberof ShareDocumentPermission
     */
    name?: any;
    /**
     * 
     * @type {string}
     * @memberof ShareDocumentPermission
     */
    description?: any;
    /**
     * 
     * @type {string}
     * @memberof ShareDocumentPermission
     */
    location?: any;
    /**
     * 
     * @type {string}
     * @memberof ShareDocumentPermission
     */
    identifier?: any;
    /**
     * 
     * @type {Array&lt;string&gt;}
     * @memberof ShareDocumentPermission
     */
    tags?: any;
    /**
     * 
     * @type {User}
     * @memberof ShareDocumentPermission
     */
    creator?: any;
    /**
     * 
     * @type {Date}
     * @memberof ShareDocumentPermission
     */
    createdAt?: any;
    /**
     * 
     * @type {Date}
     * @memberof ShareDocumentPermission
     */
    updatedAt?: any;
    /**
     * 
     * @type {string}
     * @memberof ShareDocumentPermission
     */
    date?: any;
    /**
     * 
     * @type {Array&lt;History&gt;}
     * @memberof ShareDocumentPermission
     */
    historical?: any;
    /**
     * 
     * @type {Array&lt;User&gt;}
     * @memberof ShareDocumentPermission
     */
    share?: any;
    /**
     * 
     * @type {DocumentType}
     * @memberof ShareDocumentPermission
     */
    type?: any;
    /**
     * 
     * @type {Department}
     * @memberof ShareDocumentPermission
     */
    department?: any;
    /**
     * 
     * @type {DocumentParent}
     * @memberof ShareDocumentPermission
     */
    parent?: any;
    /**
     * 
     * @type {string}
     * @memberof ShareDocumentPermission
     */
    permission?: any;
}
