import { BL } from "db://assets/fw/res/ResConst";
const B = (m: string) => BL(`Res/Audios/${m}`, "LoginBN");
export const LoginAudio = {
    bgm: B("background"),
}
