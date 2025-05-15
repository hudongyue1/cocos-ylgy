import { _decorator, AudioSource, director, Node } from 'cc';
import { ResManager } from '../res/ResManager';
const { ccclass } = _decorator;

@ccclass('AudioManager')
export class AudioManager {
    private static _instance: AudioManager = null!;

    /** AudioSource 挂载在此节点上 */
    private m_AttachNode: Node = null;
    /** AudioSource 组件 */
    private m_AudioSource: AudioSource = null;
    /** 获取单例的接口 */
    static getInstance() {
        if (this._instance === null) {
            this._instance = new AudioManager();
        }
        return this._instance;
    }

    private constructor() {
        // 私有化的构造函数
        this.m_AttachNode = director.getScene().getChildByName("Canvas");
        this.m_AudioSource = this.m_AttachNode.addComponent(AudioSource);
    }

    /** 默认播放背景音乐接口 */
    playMusic(bUrl: {
        /** * 子包名 */ b: string,
        /** * 资源路径 */ l: string,
    }): void {
        // 加载背景音乐后播放
        ResManager.getInstance().loadAudioClip(bUrl.b, bUrl.l, audioClip => {
            let audioSource = this.m_AudioSource;
            audioSource.clip = audioClip;
            audioSource.loop = true;
            audioSource.play();
        })
    }

}

