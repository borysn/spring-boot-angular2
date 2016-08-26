/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export declare class Tree<T> {
    constructor(root: TreeNode<T>);
    readonly root: T;
    /**
     * @deprecated (use ActivatedRoute.parent instead)
     */
    parent(t: T): T;
    /**
     * @deprecated (use ActivatedRoute.children instead)
     */
    children(t: T): T[];
    /**
     * @deprecated (use ActivatedRoute.firstChild instead)
     */
    firstChild(t: T): T;
    /**
     * @deprecated
     */
    siblings(t: T): T[];
    /**
     * @deprecated (use ActivatedRoute.pathFromRoot instead)
     */
    pathFromRoot(t: T): T[];
}
export declare class TreeNode<T> {
    value: T;
    children: TreeNode<T>[];
    constructor(value: T, children: TreeNode<T>[]);
    toString(): string;
}
