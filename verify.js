function Verify(username, password, simulator){
    this.username = username;
    this.password = password;
    this.simulator = sim;
    this.request = function(code, base64_){
        //发出请求
        let result = http.postJson('https://www.bingtop.com/ocr/upload/',{
            'username': this.username,
            'password': this.password,
            'captchaData': base64_,
            'captchaType': code,
        });
        return JSON.parse(result.body.string());
        /*
        { code: 0,
        message: '',
        data: 
        { captchaId: '1122-12376695-5512-4f33-b0f0-214cfa472a9f',
            captchaType: '1122',
            recognition: 'error' } }
            */
        /*
        { code: 0,
        message: '',
        data: 
        { captchaId: '1121-35c7c59e-f569-44ec-b32d-463f1973efb2',
            captchaType: '1121',
            recognition: '112' } }
        */
    }
    this.solve = function(){
        //主逻辑，主流程
        let verifier = this.get();
        let clip_ = this.clip(eval(verifier['img']));
        let json_result = this.request(verifier['code'], images.toBase64(clip_));
        if(json_result[code] != 0){
            toastLog('错误');
            console.error(json_result);
            return false;
        }
        if(json_result[code]['data']['recognition']=='error'){
            toastLog('识别有误');
            return false;
        }
        toastLog(json_result);
        //开始验证
        slider = eval(verifier['slider']);
        if(verifier['type']=='拼图'){
            this.slide(slider, parseInt(json_result[code]['data']['recognition']));
        }else if(verifier['type']=='双旋转单图'){
            slider_container = eval(verifier['slider_container']);
            this.slide(slider, parseInt(json_result[code]['data']['recognition'])*(slider_container.bounds().width()-slider.bounds().right())/180);
        }
        sleep(2000);
        //json_result[code]['data']['recognition'];

    }
    this.slide = function(slider, distance){
        //识别位置: https://www.jianshu.com/p/6b561a5776c4 通过多点找图找色的方式来找到最左侧的点的位置
        //滑动参考: https://www.d1blog.com/autojs/1752.html
        //滑动并判定是否完成,自动消失即为完成,否则为false
        start_x = random(parseInt(slider.bounds().centerX()-slider.bounds().width()/3), parseInt(slider.bounds().centerX()+slider.bounds().width()/3));
        start_y = random(parseInt(slider.bounds().centerY()-slider.bounds().height()/3), parseInt(slider.bounds().centerY()+slider.bounds().height()/3));
        end_x = start_x + distance;
        end_y = random(parseInt(slider.bounds().centerY()-slider.bounds().height()/3), parseInt(slider.bounds().centerY()+slider.bounds().height()/3));
        console.info(start_x, start_y, end_x, end_y, random(25, 50));
        this.simulator.random_swipe(start_x, start_y, end_x, end_y, random(25, 50));
    }
    this.clip = function(img){
        console.hide();
        sleep(500);
        screen = captureScreen();
        clip_ = images.clip(screen, img.bounds().left, img.bounds().top, img.bounds().width(), img.bounds().height());
        console.show();
        return clip_
    }
    this.get = function(){
        //识别是哪种验证码,并返回对应的参数
        if(classNameEndsWith("Dialog").exists()&&textMatches(/.*Verify to continue:/).exists()){
            return {'type':'拼图', 'code': 1318, 'img': 'classNameEndsWith("Dialog").findOne(3000).child(1)', 'slider': 'classNameEndsWith("Dialog").findOne(3000).child(2).child(1)', 'slider_container': 'classNameEndsWith("Dialog").findOne(3000).child(2)'};//slider = 滑块, img=图像
        }else if(classNameEndsWith("Dialog").exists()&&textMatches(/.*Drag the puzzle piece into place/).exists()){
            return {'type':'双旋转单图', 'code': 1121, 'img': 'classNameEndsWith("Dialog").findOne(3000).child(1).child(0)', 'slider': 'classNameEndsWith("Dialog").findOne(3000).child(2).child(0)', 'slider_container': 'classNameEndsWith("Dialog").findOne(3000).child(2)'};//slider = 滑块, img=图像
        }
    }
}
module.exports = Verify;