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
 * @interface Document
 */
export interface Document {
    /**
     * 
     * @type {number}
     * @memberof Document
     */
    id?: any;
    /**
     * 
     * @type {string}
     * @memberof Document
     */
    name?: any;
    /**
     * 
     * @type {string}
     * @memberof Document
     */
    description?: any;
    /**
     * 
     * @type {string}
     * @memberof Document
     */
    location?: any;
    /**
     * 
     * @type {string}
     * @memberof Document
     */
    identifier?: any;
    /**
     * 
     * @type {Array&lt;string&gt;}
     * @memberof Document
     */
    tags?: any;
    /**
     * 
     * @type {User}
     * @memberof Document
     */
    creator?: any;
    /**
     * 
     * @type {Date}
     * @memberof Document
     */
    createdAt?: any;
    /**
     * 
     * @type {Date}
     * @memberof Document
     */
    updatedAt?: any;
    /**
     * 
     * @type {string}
     * @memberof Document
     */
    date?: any;
    /**
     * 
     * @type {Array&lt;History&gt;}
     * @memberof Document
     */
    historical?: any;
    /**
     * 
     * @type {Array&lt;User&gt;}
     * @memberof Document
     */
    share?: any;
    /**
     * 
     * @type {DocumentType}
     * @memberof Document
     */
    type?: any;
    /**
     * 
     * @type {Department}
     * @memberof Document
     */
    department?: any;
    /**
     * 
     * @type {DocumentParent}
     * @memberof Document
     */
    parent?: any;
}
