import { _decorator, AssetManager, assetManager, AudioClip, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ResManager')
/** 单例模式的资源管理器 */
export class ResManager {
    private static _instance: ResManager = null!;
    /** 获取单例的接口 */
    static getInstance() {
        if (this._instance === null) {
            this._instance = new ResManager();
        }
        return this._instance;
    }

    private constructor() {
        // 私有化的构造函数
    }

    /**
     * @param bundleName Asset Bundle 的名称
     * @param prefabPath 资源路径
     * @param cb 可选回调
     */
    loadPrefab(bundleName: string, prefabPath: string, cb: (prefab: Prefab | null) => void) {
        assetManager.loadBundle(bundleName, (e, bundle) => {
            bundle.load(prefabPath, Prefab, (err, prefab: Prefab) => {
                if (err) {
                    console.error(err);
                    cb(null);
                    return;
                }
                cb(prefab)
            })
        })
    }

    /**
     * @param bundleName Asset Bundle 的名称
     * @param audioPath 音频资源路径
     * @param cb 可选回调
     */
    loadAudioClip(bundleName: string, audioPath: string, cb: (asset: AudioClip | null) => void) {
        assetManager.loadBundle(bundleName, (e, bundle) => {
            bundle.load(audioPath, AudioClip, (err, asset: AudioClip) => {
                if (err) {
                    console.error(err);
                    cb(null);
                    return;
                }
                cb(asset)
            })
        })
    }
    
    /**
     * 加载 Asset Bundle 接口
     * @param bundleName Asset Bundle 的名称
     * @param cb 可选回调
     */
    loadBundle(bundleName: string, cb?: (bundle: AssetManager.Bundle | null) => void) {
        assetManager.loadBundle(bundleName, (e, bundle) => {
            cb && cb(bundle);
        });
    }
}

