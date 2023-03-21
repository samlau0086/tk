/**
 * 这个文件用来存储抹机王的各种api的方法
 * 1. 首先要清除数据wk.clear_data();
 * 2. 换线
 * 3. 获取当前profile的路径: wk.get_profile_path()
 * 4. 修改profile名字: profile_dir = 修改wk.change_profile_name(wk.get_profile_path(), email);
 * 5. 保存当前profile: wk.save_profile
 * 6. 下次直接load_profile(profile_dir)
 */
wk = {};
wk.base_get = function(action_desc,code,extra){
    var r = http.get('http://127.0.0.1:8181/api?reqCode='+code+extra);
    if(r.statusCode!=200){
        toastLog(action_desc+"失败，请检查WPK是否在运行");
        return false;
    }
    var result = r.body.json();
    if(result.RespCode!=0){
        toastLog(result.Message);
        return false;
    }
    for(var i =0 ; i<20; i++){
        sleep(3000);
        var qr = http.get('http://127.0.0.1:8181/api?reqCode=7011&taskId='+result.Data.TaskId);
        if(qr.statusCode!=200){
            continue;
        }
        qrresult = qr.body.json();
        if(qrresult.RespCode==2){
            toastLog(action_desc+"进行中");
            continue;
        }else if(qrresult.RespCode==-1){
            toastLog(qrresult.Message);
            return false;
        }else if(qrresult.RespCode==1||qrresult.RespCode==0){
            toastLog(action_desc+"成功");
            return true
        }
    }
    return false;
}

wk.clear_data = function(){//清理环境
    toastLog();
    return this.base_get("环境清理","7001","");
}

wk.save_profile = function(){
    return this.base_get("环境保存","7003","");
}

wk.load_profile = function(profile_dir){//加载环境档案
    return this.base_get("环境加载","7002",'&configDir='+profile_dir);
}

wk.get_profile_path = function(){//获取当前环境路径
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

wk.change_profile_name = function(old_path,new_name){//原路径
    var original_path = old_path;
    try{
        var old_name = /[^\/]+(?=\.wpk)/i.exec(old_path)[0].trim().replace(/\.wpk/, '');
    }catch(e){
        console.warn('old_path有变化');
        console.info(old_path);
        var old_name = old_path.ConfigName.replace(/\.wpk/i, '');
        original_path = old_path.ConfigDir;
    }
    var path_base = /.+(?=\/[^\/]+\.wpk)/i.exec(original_path)[0].trim();
    var new_path = `${path_base}/${new_name}`;
    console.info(`http://127.0.0.1:8181/api?reqCode=7014&configName=${old_name}&updateConfigName=${new_name}`);
    var r = http.get(`http://127.0.0.1:8181/api?reqCode=7014&configName=${old_name}&updateConfigName=${new_name}`);
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
wk.test = function(){
    toastLog('ok');
}

module.exports = wk;