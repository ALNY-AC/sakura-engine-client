export default class FPS {
    /**
     * 设定动画运行多少帧后统计一次帧数 
     */
    static FPS = 8;

    /**
     * 换算为运行周期
     * 单位: ns(纳秒)
     */
    static PERIOD = (1.0 / FPS.FPS * 1000);
    /**
     * FPS最大间隔时间，换算为1s = 1000
     * 单位: ns
     */
    static FPS_MAX_INTERVAL = 1000;

    /**
     * 实际的FPS数值
     */
    nowFPS = 0.0;

    /**
     * FPS累计用间距时间
     * in ns
     */
    interval = 0;
    time = 0;
    /**
     * 运行桢累计 
     */
    frameCount = 0;

    /**
     * 制造FPS数据
     * 
     */
    makeFPS() {
        this.frameCount++;
        this.interval += FPS.PERIOD;
        //当实际间隔符合时间时。
        if (this.interval >= FPS.FPS_MAX_INTERVAL) {
            //nanoTime()返回最准确的可用系统计时器的当前值，以毫微秒为单位
            let timeNow = new Date().valueOf();
            // 获得到目前为止的时间距离
            let realTime = timeNow - this.time; // 单位: ns
            //换算为实际的fps数值
            this.nowFPS = (this.frameCount / realTime) * FPS.FPS_MAX_INTERVAL;

            //变更数值
            this.frameCount = 0;
            this.interval = 0;
            this.time = timeNow;
        }
    }

}