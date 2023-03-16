/**
 * 这个文件用来存储抹机王的各种api的方法
 * 
 */
function wk_base_get(action_desc,code,extra){
    var r = http.get('http://127.0.0.1:8181/api?reqCode='+code+extra);
    if(r.statusCode!=200){
        toastLog(action_desc+"失败，请检查WPK是否在运行");
        return false;
    }
}

function wk_clear_data(){//清理环境
    return wk_base_get("环境清理","7001","");
}

function saveProfile(){
    return wk_base_get("环境保存","7003","");
}
function loadProfile(profile_dir){//加载环境档案
    return wk_base_get("环境加载","7002",'&configDir='+profile_dir);
}
function getProfilePath(){//获取当前环境路径
    var r = http.get('http://127.0.0.1:8181/api?reqCode=7012');
    if(r.statusCode!=200){
        console.warn(action_desc+"失败，请检查WPK是否在运行");
        return "";
    }
    var result = r.body.json();
    if(result.RespCode!=0){
        console.warn(result.Message);
        return "";
    }
    return result.Data;
}
function changeProfileName(old_path,new_name){//原路径
    var reg = /(\/[^\/]+)+\/([^\/]+)/ig;
    var original_path = old_path;
    try{
        var old_name = reg.exec(old_path)[2].trim();
    }catch(e){
        console.warn('old_path有变化');
        console.info(old_path);
        var old_name = old_path.ConfigName;
        original_path = old_path.ConfigDir;
    }
    var path_reg = /((\/[^\/]+)+\/)([^\/]+)/ig;
    var path_base = path_reg.exec(original_path)[1].trim();
    var new_path = path_base+new_name;
    var r = http.get('http://127.0.0.1:8181/api?reqCode=7014&configName='+old_name+'&updateConfigName='+new_name);
    if(r.statusCode!=200){
        console.warn("修改失败，请检查WPK是否在运行");
        return original_path;
    }
    var result = r.body.json();
    if(result.RespCode>=0){
        return new_path;
    }
    console.warn(result.Message);
    return original_path;

}
function test(){
    console.show();
    console.info('ok');
}
module.exports = "*";