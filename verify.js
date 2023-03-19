function Verify(username, password, simulator){
    //打码平台: https://www.bingtop.com/
    this.username = username;//打码平台用户名
    this.password = password;//打码平台密码
    this.simulator = simulator;//模拟真人的simualte对象实例
    this.version = 18;//版本号，在修改完以后，此处的版本号需要变更

    this.request = function(code, base64_){
        //发出请求
        let result = http.post('http://www.bingtop.com/ocr/upload/',{
            'username': this.username,
            'password': this.password,
            'captchaType': code,
            'captchaData': base64_,
        }, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        );
        result_str = result.body.string();
        console.info(result_str);
        console.info(typeof(result_str));
        if(typeof(result_str)=='string'){
            return JSON.parse(result_str);
        }
        return result_str;
    }
    this.solve = function(){
        //主逻辑，主流程
        let verifier = this.get();
        let clip_ = this.clip(eval(verifier['img']));
        let json_result = this.request(verifier['code'], images.toBase64(clip_));
        console.info(json_result);
        if(json_result['code'] != 0){
            toastLog('错误');
            console.error(json_result);
            return false;
        }
        console.info(json_result['code']);
        if(json_result['data']['recognition']=='error'){
            toastLog('识别有误');
            return false;
        }
        toastLog(json_result);
        //开始验证
        console.info(verifier['slider']);
        slider = eval(verifier['slider']);
        if(verifier['type']=='拼图'){
            this.slide(slider, parseInt(json_result['data']['recognition']));
        }else if(verifier['type']=='双旋转单图'){
            slider_container = eval(verifier['slider_container']);
            this.slide(slider, parseInt(parseInt(json_result['data']['recognition'])*parseFloat((slider_container.bounds().right-slider.bounds().right)/180))+10);
        }
        sleep(2000);
    }
    this.slide = function(slider, distance){
        //滑动并判定是否完成,自动消失即为完成,否则为false
        start_x = random(parseInt(slider.bounds().centerX()-slider.bounds().width()/3), parseInt(slider.bounds().centerX()+slider.bounds().width()/3));
        start_y = random(parseInt(slider.bounds().centerY()-slider.bounds().height()/3), parseInt(slider.bounds().centerY()+slider.bounds().height()/3));
        end_x = start_x + distance;
        end_y = random(parseInt(slider.bounds().centerY()-slider.bounds().height()/3), parseInt(slider.bounds().centerY()+slider.bounds().height()/3));
        console.info(start_x, start_y, end_x, end_y, random(25, 50));
        this.simulator.random_swipe(start_x, start_y, end_x, end_y, random(25, 50));
    }
    this.clip = function(img){
        console.hide();//隐藏调试框以防遮挡
        sleep(500);
        screen = captureScreen();
        clip_ = images.clip(screen, img.bounds().left, img.bounds().top, img.bounds().width(), img.bounds().height());
        sleep(500);
        console.show();
        return clip_;
    }
    this.get = function(){
        //识别是哪种验证码,并返回对应的参数
        if(classNameEndsWith("Dialog").exists()&&textMatches(/.*Verify to continue:/).exists()){
            return {'type':'拼图', 'code': 1318, 'img': 'classNameEndsWith("Dialog").findOne(3000).child(1)', 'slider': 'idEndsWith("secsdk-captcha-drag-wrapper").findOne(3000)', 'slider_container': 'classNameEndsWith("Dialog").findOne(3000).child(2)'};//slider = 滑块, img=图像
        }else if(classNameEndsWith("Dialog").exists()&&textMatches(/.*Drag the puzzle piece into place/).exists()){
            return {'type':'双旋转单图', 'code': 1121, 'img': 'classNameEndsWith("Dialog").findOne(3000).child(1).child(0)', 'slider': 'idEndsWith("secsdk-captcha-drag-wrapper").findOne(3000)', 'slider_container': 'classNameEndsWith("Dialog").findOne(3000).child(2)'};//slider = 滑块, img=图像
        }
    }
    this.test = function(msg){
        //测试版本是否生效
        console.info(this.version);
    }
}
module.exports = Verify;