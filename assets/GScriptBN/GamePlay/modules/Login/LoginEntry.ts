import { _decorator, Component } from 'cc';
import { AudioManager } from '../../../core/modules/audio/AudioManager';
import { LoginAudio } from './LoginAudio';
import { ResManager } from '../../../core/modules/res/ResManager';
const { ccclass } = _decorator;

@ccclass('LoginEntry')
export class LoginEntry extends Component {
    start() {
        // 加载背景音乐后播放
        AudioManager.getInstance().playMusic(LoginAudio.bgm);
        this.simulateLogin();
    }

    simulateLogin() {
        this.scheduleOnce(() => {
            this.onLoginSuccess();
        }, 1.5);
    }
    
    onLoginSuccess() {
        ResManager.getInstance().loadBundleAsync("Match3BN");
        let match3Entry = this.node.addComponent("Match3Entry");
        (match3Entry as any).init();
        // ResManager.getInstance().loadBundle("Match3BN", () => {
        //     let match3Entry = this.node.addComponent("Match3Entry");
        //     (match3Entry as any).init();
        // });
    }

    update(deltaTime: number) {
        
    }
}

