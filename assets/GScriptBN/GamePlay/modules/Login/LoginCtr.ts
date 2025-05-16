import { _decorator } from 'cc';
import { AudioManager } from '../../../core/modules/audio/AudioManager';
import { LoginAudio } from './LoginAudio';
const { ccclass } = _decorator;

@ccclass('LoginCtr')
export class LoginCtr {
    init() {
        // 加载背景音乐后播放
        AudioManager.getInstance().playMusic(LoginAudio.bgm);
        // this.simulateLogin();
    }

    private m_OnLoginSuccess: Function = null;
    showLogin(onLoginSuccess: Function) {
        this.m_OnLoginSuccess = onLoginSuccess;
        this.autoLogin();
    }

    autoLogin() {
        // 模拟登录耗时 1 秒回调实现（后续修改此为不同平台登录逻辑即可）
        setTimeout(() => {
            this.m_OnLoginSuccess();
        }, 1000)
    }

    // simulateLogin() {
    //     this.scheduleOnce(() => {
    //         this.onLoginSuccess();
    //     }, 1.5);
    // }
    
    // onLoginSuccess() {
    //     ResManager.getInstance().loadBundleAsync("Match3BN");
    //     let match3Entry = this.node.addComponent("Match3Entry");
    //     (match3Entry as any).init();
    //     // ResManager.getInstance().loadBundle("Match3BN", () => {
    //     //     let match3Entry = this.node.addComponent("Match3Entry");
    //     //     (match3Entry as any).init();
    //     // });
    // }

    update(deltaTime: number) {
        
    }
}

