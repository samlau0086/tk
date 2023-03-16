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
登录页面 = View(['idMatches(/.*title$/).textMatches(/.*Login in to Tiktok/)'],[]);
//get_module('');
console.show();
function main(){
    while(1){
        if(currentPackage()!='com.zhiliaoapp.musically'){
            //未启动tiktok
            app.launch('com.zhiliaoapp.musically');
        }
        if(登录页面.is_active()){
            //登录页面
            toastLog('登录页面');
        }
        toastLog();
        break;
    }
}

main();