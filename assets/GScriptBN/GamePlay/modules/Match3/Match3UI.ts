import { _decorator, Component } from 'cc';
const { ccclass } = _decorator;

@ccclass('Match3UI')
export class Match3UI extends Component {
    start() {
        console.log(`主玩法界面`)
    }
}

