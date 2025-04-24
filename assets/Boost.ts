import { _decorator, Component, ResolutionPolicy, screen, Size, view } from 'cc';
const { ccclass, property } = _decorator;

/** 
 * 画布的标准化尺寸，就是之前说的
 * iPad 设备中的画布尺寸 = 1001 x 1334 (其中 1001 ≈ 1668/1.6672)
 * iPhone16设备中的画布尺寸 = 750 x1626（其中 1626 = 2556/1.572）
 */
export const G_VIEW_SIZE = new Size(0, 0);

@ccclass('Boost')
export class Boost extends Component {
    start() {
        this.adapterScreen();
    }

    adapterScreen() {
        let resolutionPolicy: ResolutionPolicy = view.getResolutionPolicy();
        let designSize = view.getDesignResolutionSize();
        let frameSize = screen.windowSize;
        let frameW = frameSize.width;
        let frameH = frameSize.height;
        /** 是否是屏幕更宽 */
        const isScreenWidthLarger = (frameW / frameH) > (designSize.width / designSize.height);
        let targetResolutionPolicy = isScreenWidthLarger ? ResolutionPolicy.FIXED_HEIGHT : ResolutionPolicy.FIXED_WIDTH;
        if (targetResolutionPolicy !== resolutionPolicy.getContentStrategy().strategy) {
            /** 保证设计分辨率的内容都能显示出来 */
            view.setDesignResolutionSize(designSize.width, designSize.height, targetResolutionPolicy);
        }

        /** 实际的尺寸会和设计分辨率在一个维度，但是宽或高更大 */
        if (isScreenWidthLarger) {
            G_VIEW_SIZE.width = Math.ceil(designSize.height * frameSize.width / frameSize.height);
            G_VIEW_SIZE.height = designSize.height;
        } else {
            G_VIEW_SIZE.width = designSize.width;
            G_VIEW_SIZE.height = Math.ceil(designSize.width * frameSize.height / frameSize.width);
        }

        console.log(`屏幕${isScreenWidthLarger ? "更宽, 高度适配" : "更高, 宽度适配"} 设计分辨率比例下的屏幕尺寸: ${G_VIEW_SIZE.width}x${G_VIEW_SIZE.height}`);
    }
}