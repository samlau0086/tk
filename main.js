auto();
auto.waitFor();
if(!requestScreenCapture()){
    toast('截图请求失败');
}
function get_file_name_from_url(url){
    return url.match(/\/*([^\/]+\.\w+$)/)[1];
}
function download(f_url){
    f_name = get_file_name_from_url(f_url);
    btyes_ = http.get(f_url).body.bytes();
    files.write(f_name, '');
    files.writeBytes(f_name, btyes_);
    return f_name;
}
function get_module(path, force){
    if((!files.isFile(path))||force){
        toastLog('下载:'+get_file_name_from_url(path));
        download('https://raw.githubusercontent.com/samlau0086/tk/main/'+get_file_name_from_url(path));
    }
    return require(path);
}
//判断输入法是否弹出函数
function hide_input() {
    for (var i = 0; auto.windows[i] != null; i++) {
        if (auto.windows[i].toString().indexOf("INPUT") != -1) {
            //toastLog("输入法弹出状态,关闭输入法");
            context.getSystemService(context.INPUT_METHOD_SERVICE).toggleSoftInput(0, android.view.inputmethod.InputMethodManager.HIDE_NOT_ALWAYS)
            break;
        }
    }
}
  
function current_date(){
    return new Date(textMatches(/.*\w+\s\d+,\s\d+/).findOne(3000).text())
}

function swipe_date(direction, x_range){
    for(let i=0; i<Math.abs(direction); i++){
        y1 = random(1592, 1665);
        y2 = direction<0?y1-random(168, 210):y1+random(168, 210);
        swipe(random(x_range[0], x_range[1]), y1, random(x_range[0], x_range[1]), y2, random(400, 800)+i/Math.abs(direction)*300);
    }
}

function set_month(month){
    direction = current_date().getMonth()+1-month;
    if(direction==0){
        return true;
    }
    if(Math.abs(direction)>6){
        direction=Math.abs(12-Math.abs(direction))*(0-direction)/Math.abs(direction);
    }
    swipe_date(direction, [224, 330]);
    sleep(1200);
    return set_month(month);
}

function set_day(day){
    direction = current_date().getDate()-day;
    if(direction==0){
        return true;
    }
    swipe_date(direction, [510, 560]);
    return set_day(day);
}


function set_year(year){
    direction = current_date().getFullYear()-year;
    if(direction==0){
        return true;
    }
    swipe_date(direction, [735, 829]);
    sleep(1000);
    return set_year(year);
}

function set_birthday(year, month, day){
    //当前月份
    new Date().getFullYear();
    new Date().getDate();
    if(idEndsWith('d9c').classNameEndsWith('EditText').editable(true).findOne(3000).text().toLowerCase()=='birthday'){
        //未激活
        swipe(random(224, 330), y1, random(224, 330), y2, 1000);
        sleep(1000);
    }
    set_month(month);
    time.sleep(1000);
    set_day(day);
    time.sleep(1000);
    set_year(year);
    time.sleep(1000);
}

wk = get_module('wipeking.js');
View = get_module('View.js');
Verify = get_module('verify.js');
verify = new Verify('samlau0086', '4101nixuil');
//同时存在的页面时，通过元素的坐标来判断当前是什么页面
//条件里面不能用+,会被误识别
登录页面 = new View(['idMatches(/.*title$/).textContains("Log in to TikTok").exists()', 'idMatches(/.*title$/).textContains("Log in to TikTok").findOne(3000).bounds().centerX()==device.width/2'],[]);
注册页面 = new View(['idMatches(/.*title$/).textContains("Sign up for TikTok").exists()','idMatches(/.*title$/).textContains("Sign up for TikTok").findOne(3000).bounds().centerX() == device.width/2'],[]);
年龄选择页面 = new View(['textContains("your birthday?").exists()', '(textContains("your birthday?").findOne(3000).bounds().centerX()/device.width).toFixed(2)==0.3']);
手机号填写页面 = new View(['textMatches(/.*Phone number/).classNameEndsWith("EditText").exists()', 'textMatches(/.*Phone number/).classNameEndsWith("EditText").findOne(3000).bounds().centerX() > 0']);
邮箱填写页面 = new View(['textMatches(/.*(Email address|\w*@\w*(\.\w*)*)/).classNameEndsWith("EditText").exists()', 'textMatches(/.*(Email address|\w*@\w*(\.\w*)*)/).classNameEndsWith("EditText").findOne(3000).bounds().centerX()<device.width'],[]);
密码填写页面 = new View(['textMatches(/.*Create password/).exists()', 'textMatches(/.*Your password must have at least:.*/).exists()']);//
滑动验证弹窗 = new View(['textMatches(/.*Verify to continue:/).exists()','classNameEndsWith("Dialog").exists()'])

console.show();
email = 'samlau20230317@gmail.com';
function main(){
    while(1){
        if(currentPackage()!='com.zhiliaoapp.musically'){
            //未启动tiktok
            app.launch('com.zhiliaoapp.musically');
        }
        if(登录页面.is_active()){
            //登录页面
            toastLog('登录页面');
            idEndsWith("ebo").clickable(true).findOne(3000).click();
            time.sleep(1000);
        }
        if(注册页面.is_active()){
            toastLog('注册页面');
            textContains('Use phone or email').findOne(3000).parent().click();
        }
        if(年龄选择页面.is_active()){
            toastLog('年龄选择页面');
            //toastLog(idMatches(/.*d9c/).textMatches(/.*\w+\s\d+,\s\d+|.*Birthday/).exists());
            //set_month(3);
            //set_day(24);
            //set_year(1979);
            let current_year = new Date().getFullYear();
            let month = random(1, 12);
            let day = [1,3,5,7,8,10,12].indexOf(month)!=-1?random(1, 31):(month==2?((current_year % 4 == 0 && current_year % 100 != 0) || current_year % 400 == 0?random(1, 29):random(1,28)):random(1,30));
            set_birthday(random(current_year-38, current_year-18), random(1, 12), random(4));//18~38岁
            //idEndsWith('ok').textEndsWith('Next').findOne(3000).click();;
            //swipe(295, 1625, 272, 1457, 1000);
            
            //swipe(295, 1625, 300, 1835, 1000);
            //toastLog(idEndsWith('d9c').classNameEndsWith('EditText').editable(true).findOne(3000).text().toLowerCase());
            //点击年龄框
            //toastLog(idEndsWith('d9c').classNameEndsWith('EditText').editable(true).findOne(3000).text());
            //May 16, 2022
            //engines.execAutoFile('monthup');
            //engines.execAutoFile('monthdown');
            //engines.execAutoFile('./test.auto');
            //idEndsWith('d9c').classNameEndsWith('EditText').editable(true).findOne(3000).setText('May 16, 2001');
        }
        if(手机号填写页面.is_active()){
            toastLog('手机号填写页面');
            textMatches(/.*Email/).classNameEndsWith("TextView").findOne(3000).parent().click();
            sleep(1000);
        }
        
        if(邮箱填写页面.is_active()){
            toastLog('邮箱填写页面');
            return;
            if(textMatches(/.*Maximum number of attempts reached.*/).exists()){
                toastLog('尝试次数超限');
                return false;
            }
            email_edit_text = textMatches(/.*(Email address|\w*@\w*(\.\w*)*)/).classNameEndsWith("EditText").findOne(3000);
            if((!textContains(email).classNameEndsWith("EditText").exists())){
                toastLog('需要填写邮箱');
                if(boundsInside(email_edit_text.bounds().right, email_edit_text.bounds().top, device.width, email_edit_text.bounds().bottom).classNameEndsWith("ImageView").clickable(true).exists()){
                    //点击清除按钮
                    toastLog('清除不匹配的邮箱');
                    boundsInside(email_edit_text.bounds().right, email_edit_text.bounds().top, device.width, email_edit_text.bounds().bottom).classNameEndsWith("ImageView").clickable(true).findOne(3000).click();
                    sleep(500);
                }
                email_edit_text.setText(email);
            }
            sleep(1000);
            textMatches(/.*Next/).classNameEndsWith('TextView').findOne(3000).parent().click();
            sleep(2000);
        }
        if(滑动验证弹窗.is_active()){
            toastLog('滑动验证页面');
            //toastLog(classNameEndsWith("Dialog").exists());
            //console.info(classNameEndsWith("Dialog").findOne(3000).child(1).bounds());
            images.save(verify.clip(classNameEndsWith("Dialog").findOne(3000).child(1)), 'cliped2.png', format='png', quality=100);
            /*
            img = classNameEndsWith("Dialog").findOne(3000).child(1);
            console.info(img.bounds().left, img.bounds().top, img.bounds().width(), img.bounds().height());
            screen = captureScreen();
            clip_ = images.clip(screen, img.bounds().left, img.bounds().top, img.bounds().width(), img.bounds().height());
            images.save(clip_, 'cliped.png', format='png', quality=100);
            */
            //images.save(clip_, 'cliped.png', format='png', quality=100);
            //images.save(verify.clip(classNameEndsWith("Dialog").findOne(3000).child(1)), 'cliped.png', format='png', quality=100);
            //draw_focus(bounds);
        }
        if(密码填写页面.is_active()){
            toastLog('密码填写页面');
            if(textMatches(/.*No internet connection/).exists()){
                toastLog('无网络');
                return false;
            }
            console.info(classNameEndsWith('EditText').editable(true).findOne(3000).setText('4101nixuiL@'));//密码必须有大小写，特殊字符#?!$&@至少8个字符，最多20个字符
            console.info(textMatches(/.*Next/).findOne(3000).parent().click());
            
        }

        break;
    }
}
main();
toastLog('结束');