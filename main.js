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
wk = get_module('wipeking.js');
View = get_module('View.js');
登录页面 = new View(['currentActivity().indexOf("ComposeView")!=-1','idMatches(/.*title$/).textContains("Log in to TikTok").exists()'],[]);
注册页面 = new View(['currentActivity().indexOf("SignUpActivity")!=-1','idMatches(/.*title$/).textContains("Sign up for TikTok").exists()'],[]);
//get_module('');
console.show();
toastLog(currentActivity());
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
        }
        if(注册页面.is_active()){
            toastLog('注册页面');
        }
        toastLog('here');
        break;
    }
}

main();