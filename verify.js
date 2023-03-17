function Verify(username, password){
    this.username = username;
    this.password = password;
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
        //开始验证
        if(verifier['type']=='拼图'){
            this.slide(verifier['slider'], parseInt(json_result[code]['data']['recognition']));
        }
        //json_result[code]['data']['recognition'];

    }
    this.slide = function(slider, distance){
        //滑动并判定是否完成,自动消失即为完成,否则为false
        start_x = slider.bounds().centerX();
        for(let i=0; i<distance-start_x;i++){

        }
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
        if(classNameEndsWith("Dialog").exists()){
            return {'type':'拼图', 'code': 1318, 'img': 'classNameEndsWith("Dialog").findOne(3000).child(1)', 'slider': 'classNameEndsWith("Dialog").findOne(3000).child(2).child(1)', 'slider_container': 'classNameEndsWith("Dialog").findOne(3000).child(2)'};//slider = 滑块, img=图像
        }
    }
}
module.exports = Verify;