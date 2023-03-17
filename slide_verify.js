/**
 * 这个主要用来解决滑动验证的问题
 * 用打码的1121,1122来计算旋转角度，从而推算拖动距离
 * https://bingtop.com/
 * 公式: 最大拖动距离/最大旋转角度*旋转角度 = 拖动距离
 * 
 */
//
//

if(!requestScreenCapture()){
    toast('截图请求失败');
}
var img = captureScreen();
sleep(1000);
console.show();
console.info(device.width, device.height);

function degree_to_distance(degree){
    
}
//console.info(images.toBase64(img, format='png', quality=50));
/**
 * 295 770

785 1250
 */
path = './base64/';
while(1){
    console.info(img.width, img.height);
    img2 = images.clip(img, 295, 770, 490, 490);//x,y,w,h:295, 770, 490, 490
    console.info(img2.width, img2.height);
    //images.save(img2, 'abc.png', format="png", quality=100);
    ba_ = images.toBase64(img2);
    files.createWithDirs(path+'test.txt')
    files.write(path+'test.txt', ba_);
    //images.toBase64(img2);
    break;
}
//'https://www.bingtop.com/ocr/upload2/'
result = http.postJson('https://www.bingtop.com/ocr/upload/',{
    'username': 'samlau0086',
    'password': '4101nixuil',
    'captchaData': ba_,
    'captchaType': 1121,
});
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

toastLog(JSON.parse(result.body.string()));