auto();
auto.waitFor();

if(!requestScreenCapture()){
    toast('截图请求失败');
}
sleep(1000);
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

function append_to_file(path, content){
    if(!files.exists(path)){
        files.createWithDirs(path);
    }
    files.append(path, content);
}

function get_module(path, force){
    if((!files.isFile(path))||force){
        toastLog('下载:'+get_file_name_from_url(path));
        download('https://raw.githubusercontent.com/samlau0086/tk/main/'+get_file_name_from_url(path));
    }
    return require(path);
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
    console.info('设置生日: ', year, month, day);
    if(idEndsWith('d9c').classNameEndsWith('EditText').editable(true).findOne(3000).text().toLowerCase()=='birthday'){
        //未激活
        y1 = random(1592, 1665);
        y2 = random(0,9)>4?y1-random(168, 210):y1+random(168, 210);
        swipe(random(224, 330), y1, random(224, 330), y2, 1000);
        sleep(1000);
    }
    set_month(month);
    sleep(1000);
    set_day(day);
    sleep(1000);
    set_year(year);
    sleep(1000);
}
const firstNames = [
    'Emma', 'Olivia', 'Ava', 'Sophia', 'Isabella', 'Mia', 'Charlotte', 'Amelia', 'Harper', 'Evelyn', 'Abigail', 'Emily', 'Elizabeth', 'Madison', 'Avery', 'Ella', 'Scarlett', 'Victoria', 'Grace', 'Chloe', 'Aria', 'Lily', 'Zoey', 'Penelope', 'Layla', 'Riley', 'Stella', 'Aurora', 'Hannah', 'Natalie', 'Lila', 'Audrey', 'Savannah', 'Addison', 'Brooklyn', 'Ellie', 'Paisley', 'Arianna', 'Caroline', 'Elena', 'Maya', 'Gabby', 'Brielle', 'Leah', 'Addison', 'Mackenzie', 'Hailey', 'Katherine', 'Samantha', 'Morgan', 'Ava', 'Scarlett', 'Madison', 'Elizabeth', 'Isabella', 'Michael', 'William', 'James', 'Benjamin', 'Elijah', 'Lucas', 'Mason', 'Ethan', 'Alexander', 'Henry', 'Sebastian', 'Jackson', 'Aiden', 'Daniel', 'Matthew', 'Samuel', 'David', 'Joseph', 'Carter', 'Owen', 'Wyatt', 'Gabriel', 'Julian', 'Leo', 'Levi', 'Aaron', 'Dylan', 'Caleb', 'Connor', 'Hunter', 'Nicholas', 'Zachary', 'Nolan', 'Adam', 'Cole', 'Ian', 'Eli', 'Cameron', 'Xavier', 'Vincent', 'Christopher', 'Jaxon', 'Grayson', 'Lincoln', 'Isaiah','John', 'Jon', 'Jack', 'Johnny', 'Jonathan', 'Johannes', 'James', 'Jamie', 'Jim', 'Jimmy', 'Jaime', 'Jem', 'William', 'Will', 'Bill', 'Billy', 'Liam', 'Willy', 'Robert', 'Bob', 'Bobby', 'Rob', 'Robbie', 'Rupert', 'Michael', 'Mike', 'Mikey', 'Mick', 'Micky', 'Mikhail', 'David', 'Dave', 'Davy', 'Davie', 'Davida', 'Daivid', 'Christopher', 'Chris', 'Christie', 'Christy', 'Topher', 'Kester', 'Daniel', 'Dan', 'Danny', 'Dane', 'Dani', 'Danté', 'Matthew', 'Matt', 'Matty', 'Mat', 'Mathew', 'Matteo', 'Joseph', 'Joe', 'Joey', 'Jo', 'José', 'Joss', 'Richard', 'Rick', 'Ricky', 'Rich', 'Richie', 'Rico', 'Thomas', 'Tom', 'Tommy', 'Tomás', 'Thoma', 'Tomas', 'Charles', 'Charlie', 'Chuck', 'Chas', 'Charley', 'Carlo', 'Anthony', 'Tony', 'Antony', 'Anton', 'Antonio', 'Antoin', 'Edward', 'Ed', 'Eddie', 'Eddy', 'Eduardo', 'Edwin', 'George', 'Georgie', 'Georgy', 'Georg', 'Jorge', 'Giorgio', 'Steven', 'Steve', 'Stevie', 'Stefan', 'Stephen', 'Stefanos', 'Brian', 'Bryan', 'Bryon', 'Brion', 'Brain', 'Brayan', 'Kevin', 'Kev', 'Kevvy', 'Kevan', 'Keven', 'Kevein', 'Andrew', 'Andy', 'Drew', 'Andreas', 'Andre', 'Andrius', 'Mark', 'Marc', 'Marcus', 'Marko', 'Markie', 'Marques', 'Paul', 'Paolo', 'Paulie', 'Poul', 'Pauly', 'Poll', 'Stephen', 'Steve', 'Stevie', 'Stefan', 'Steven', 'Stefanos', 'Timothy', 'Tim', 'Timmy', 'Timo', 'Timoteo', 'Tymon', 'Kenneth', 'Ken', 'Kenny', 'Kenn', 'Kendrick', 'Kennith', 'Jason', 'Jay', 'Jase', 'Jaison', 'Jasen', 'Jasón', 'Eric', 'Erik', 'Erick', 'Eryk', 'Erico', 'Eriq', 'Anthony', 'Tony', 'Antony', 'Anton', 'Antonio', 'Antoin', 'Jonathan', 'Jon', 'Jonny', 'Johnathan', 'Jonatan', 'Jonty', 'William', 'Will', 'Billy', 'Bill', 'Liam', 'Willy', 'Benjamin', 'Ben', 'Benny', 'Benjy', 'Benji', 'Benjaman', 'Nicholas', 'Nick', 'Nicky', 'Nico', 'Nikolai', 'Nikolas', 'Samuel', 'Sam', 'Sammy', 'Sami', 'Samson', 'Samuele', 'Jeffrey', 'Jeff', 'Jeffery', 'Jeffry', 'Geffrey', 'Joffrey', 'Scott', 'Scot', 'Scotty', 'Scottie', 'Scotti', 'Scotta', 'Joseph', 'Joe', 'Joey', 'Jo', 'José', 'Joss', 'Patrick', 'Pat', 'Paddy', 'Patsy', 'Pate', 'Padraig', 'Anthony', 'Tony', 'Antony', 'Anton', 'Antonio', 'Antoin'
];
  
const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Perez', 'Taylor', 'Anderson', 'Wilson', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Moore', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Green', 'Baker', 'Adams', 'Nelson', 'Carter', 'Mitchell', 'Perez', 'Roberts', 'Turner', 'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins', 'Stewart', 'Sanchez', 'Morris', 'Rogers', 'Reed', 'Cook', 'Cooper', 'Bailey', 'Butler', 'Murphy', 'Gray', 'Cox', 'James', 'Reyes', 'Cruz', 'Hughes', 'Price', 'Myers', 'Flores', 'Long', 'Powell', 'Sullivan', 'Jenkins', 'Wood', 'Kim', 'Ward', 'Foster', 'Gonzales', 'Bryant', 'Alexander', 'Russell', 'Griffin', 'Diaz', 'Hayes', 'Holland', 'Vargas', 'Holland', 'Mcdonald', 'Mendoza', 'Montgomery', 'Luna', 'Freeman', 'Wells', 'Webb', 'Simpson', 'Porter', 'Hunter', 'Hicks', 'Crawford', 'Henry', 'Boyd', 'Mason', 'Robertson', 'Black', 'Holmes', 'Stone', 'Summers', 'Smith', 'Smyth', 'Schmidt', 'Schmitt', 'Smithe', 'Smythe', 'Johnson', 'Johnston', 'Johnstone', 'Jonson', 'Williams', 'Williamson', 'William', 'Wilms', 'Wiliams', 'Brown', 'Browne', 'Braun', 'Broun', 'Jones', 'Jonas', 'Johnston', 'Johnes', 'Joanes', 'Miller', 'Millar', 'Muller', 'Mueller', 'Milner', 'Davis', 'Davies', 'Davids', 'Davy', 'Garcia', 'Garza', 'Garci', 'Garzia', 'Garciaparra', 'Rodriguez', 'Rodriquez', 'Rodrigues', 'Rodrigue', 'Rodrique', 'Martinez', 'Martin', 'Martine', 'Martinet', 'Martines', 'Hernandez', 'Fernandez', 'Hernandes', 'Hernandis', 'Hernand', 'Lopez', 'Lopes', 'Lopaz', 'Lopa', 'Lopess', 'Gonzalez', 'Gonzales', 'Gonzalesz', 'Gonsalez', 'Gonsales', 'Perez', 'Perezza', 'Pera', 'Perre', 'Perres', 'Taylor', 'Tayler', 'Taylour', 'Tailor', 'Taelor', 'Anderson', 'Andeson', 'Andreason', 'Andersson', 'Andrus', 'Wilson', 'Wilsen', 'Wilsson', 'Wilsin', 'Willson', 'Jackson', 'Jakson', 'Jaxon', 'Jacksen', 'Jacksin', 'White', 'Whyte', 'Wight', 'Wite', 'Whight', 'Harris', 'Haris', 'Harriss', 'Harries', 'Harrys', 'Martin', 'Marten', 'Martyn', 'Martine', 'Marton', 'Thompson', 'Thomson', 'Tomson', 'Thomason', 'Thompsen', 'Moore', 'More', 'Moor', 'Moors', 'Mores', 'Young', 'Yong', 'Yung', 'Younge', 'Youngs', 'Allen', 'Allan', 'Allan', 'Alen', 'Allens', 'King', 'Kings', 'Kington', 'Kinge', 'Kingsley', 'Wright', 'Writ', 'Wriht', 'Write', 'Wryt', 'Scott', 'Scot', 'Scotte', 'Scotto', 'Scotty', 'Green', 'Greene', 'Grean', 'Grein', 'Greyn', 'Baker', 'Bakker', 'Bakers', 'Bake', 'Bak', 'Adams', 'Adam', 'Addams', 'Addam', 'Adames', 'Nelson', 'Nelsen', 'Nellson', 'Nels', 'Nelsan', 'Carter', 'Cartier', 'Carters', 'Carther', 'Cartar', 'Mitchell', 'Mitchel', 'Mitchelle', 'Mitchells', 'Mitchells', 'Perez', 'Peres', 'Parez', 'Parezz', 'Parej', 'Roberts', 'Robert', 'Robers', 'Robberts', 'Robarts', 'Turner', 'Turnor', 'Turnar', 'Turnir', 'Turnere', 'Phillips', 'Philip', 'Phillip', 'Philips', 'Phillis', 'Campbell', 'Cambell', 'Camble', 'Campell', 'Campbel', 'Parker', 'Park', 'Parkes', 'Parks', 'Parkar', 'Evans', 'Evens', 'Evins', 'Evanes', 'Evan', 'Edwards', 'Edward', 'Edwardes', 'Edwardson', 'Edwardsen', 'Collins', 'Collin', 'Collings', 'Collinns', 'Collinss', 'Stewart', 'Stuart', 'Steward', 'Stewert', 'Stewort', 'Sanchez', 'Sanche', 'Sancho', 'Sanches', 'Sanch', 'Morris', 'Moris', 'Moriss', 'Morriss', 'Morries', 'Rogers', 'Roger', 'Rodger', 'Rodgerson', 'Rodgerrs', 'Reed', 'Reid', 'Reede', 'Reeder', 'Reade', 'Cook', 'Cooke', 'Cooks', 'Coox', 'Cok', 'Cooper', 'Coper', 'Coopr', 'Coopper', 'Coopar', 'Bailey', 'Bailley', 'Baile', 'Bail', 'Bailie', 'Butler', 'Butlar', 'Butlers', 'Butlerr', 'Butlars', 'Murphy', 'Murphey', 'Murphie', 'Murfey', 'Murphee', 'Gray', 'Grey', 'Graye', 'Graey', 'Grai', 'Cox', 'Coxe', 'Coxx', 'Cocks', 'Coxs', 'James', 'Jamie', 'Jaimie', 'Jame', 'Jaimes', 'Reyes', 'Reys', 'Rayes', 'Reye', 'Reis', 'Cruz', 'Kruz', 'Cruise', 'Cruze', 'Cruse', 'Hughes', 'Huges', 'Hughe', 'Hugh', 'Hughs', 'Price', 'Pryce', 'Prise', 'Prys', 'Prisee', 'Myers', 'Myer', 'Meyers', 'Meyr', 'Mayers', 'Flores', 'Floris', 'Flor', 'Florez', 'Floress', 'Long', 'Longe', 'Longs', 'Longes', 'Longue', 'Powell', 'Powel', 'Pow'
];

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function get_random_name() {
    return [firstNames[Math.floor(Math.random() * firstNames.length)], lastNames[Math.floor(Math.random() * lastNames.length)]];
}

function get_random_str(length) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function get_user(domain){
    domain = domain?domain:'kuajingbay.com';
    date = new Date();
    month = date.getMonth() + 1;
    day = date.getDate();
    year = date.getFullYear();
    random_str = get_random_str(3);
    random_v = `${month}${day}${random_str}`;
    nickname = (get_random_name().join('')+random_v).toLowerCase();
    return {'email': `${nickname}@${domain}`, 'password': '4101nixuil', 'nickname': nickname};
}

//引入各种模块
wk = get_module('wipeking.js');
View = get_module('View.js');
Verify = get_module('verify.js');//, true
sim = get_module('simulate.js');

//全局对象或者变量定义
//verify = new Verify('打码平台用户名', '打码平台密码', sim);
verify = new Verify('samlau0086', '4101nixuil', sim);

//同时存在的页面时，通过元素的坐标来判断当前是什么页面
//条件里面不能用+,会被误识别
登录页面 = new View(['idMatches(/.*title$/).textContains("Log in to TikTok").exists()', 'idMatches(/.*title$/).textContains("Log in to TikTok").findOne(3000).bounds().centerX()==device.width/2'],[]);
注册页面 = new View(['idMatches(/.*title$/).textContains("Sign up for TikTok").exists()','idMatches(/.*title$/).textContains("Sign up for TikTok").findOne(3000).bounds().centerX() == device.width/2'],[]);
年龄选择页面 = new View(['textContains("your birthday?").exists()', '(textContains("your birthday?").findOne(3000).bounds().centerX()/device.width).toFixed(2)==0.3']);
手机号填写页面 = new View(['textMatches(/.*Phone number/).classNameEndsWith("EditText").exists()', 'textMatches(/.*Phone number/).classNameEndsWith("EditText").findOne(3000).bounds().centerX() > 0']);
邮箱填写页面 = new View(['textMatches(/.*(Email address|\w*@\w*(\.\w*)*)/).classNameEndsWith("EditText").exists()', 'textMatches(/.*(Email address|\w*@\w*(\.\w*)*)/).classNameEndsWith("EditText").findOne(3000).bounds().centerX()<device.width'],[]);
密码填写页面 = new View(['textMatches(/.*Create password/).exists()', 'textMatches(/.*Your password must have at least:.*/).exists()']);//
滑动验证弹窗 = new View(['textMatches(/.*Verify to continue:/).exists()','classNameEndsWith("Dialog").exists()']);
旋转验证弹窗 = new View(['textMatches(/.*Drag the puzzle piece into place/).exists()','classNameEndsWith("Dialog").exists()']);
Google登录弹出 = new View(['idEndsWith("design_bottom_sheet").exists()', 'idEndsWith("cancel").clickable(true).exists()']);
用户名填写页面 = new View(['textMatches(/.*Create nickname/).exists()', 'textMatches(/.*Confirm/).exists()']);
选择兴趣页面 = new View(['textMatches(/.*Comedy.*/).exists()', 'textMatches(/.*Daily Life.*/).exists()', 'textMatches(/.*Skip.*/).exists()']);
Swipeup页面 = new View(['textMatches(/.*Start watching/).exists()','textMatches(/.*Swipe up/).exists()']);
Swipeupformore页面 = new View(['textMatches(/.*Swipe up for more/).exists()', 'textMatches(/.*For You/).exists()']);
ForYou页面 = new View(['']);
console.show();

//在注册完以后用户名和密码要存起来,用记事本存起来就行
//注册完以后需要邮件验证

function sml_swipe(down){//默认都是up,即不指定或者为0,要向下滑则传入down = true/1
    x1 = random(parseInt(device.width/9), parseInt(device.width*8/9));
    if(x1>device.width/2){//右手滑
        x2 = random(x1, x1+device.width/9);
    }else{//左手滑
        x2 = random(x1-device.width/9, x1);
    }
    y1 = random(parseInt(device.height*5/6-device.height/12), parseInt(device.height*5/6));
    y2 = random(device.height/2, device.height/3);
    if(down){
        x3 = x1;
        x1 = x2;
        x2 = x3;
        y3 = y1;
        y1 = y2;
        y2 = y3;
    }
    sim.sml_move(x1, y1, x2, y2, random(200, 280));
}

function switch_ip(host,port){
    toast('切换IP');
    try{
        result = JSON.parse(http.get(host+'/api/refresh_sessions/'+port).body.string());
        if(result['session_id']){
            sleep(2000);
            toast('IP切换成功');
            return result['session_id'];
        }
    }catch(err){
        console.error(result);
    }
    return false;
}

function reg(userinfo){
    while(1){
        if(currentPackage()!='com.zhiliaoapp.musically'){
            //未启动tiktok
            app.launch('com.zhiliaoapp.musically');
            for(let i=0; i< 3; i++){
                idEndsWith('button1').textContains('Accept').exists();
            }
            
        }
        if(登录页面.is_active()){
            //登录页面
            toastLog('登录页面');
            idEndsWith("ebo").clickable(true).findOne(3000).click();
            sleep(1000);
        }
        if(注册页面.is_active()){
            toastLog('注册页面');
            textContains('Use phone or email').findOne(3000).parent().click();
        }
        if(年龄选择页面.is_active()){
            toastLog('年龄选择页面');
            let current_year = new Date().getFullYear();
            if(!(idEndsWith('d9c').classNameEndsWith('EditText').editable(true).findOne(3000).text().toLowerCase().indexOf('birthday')==-1&&current_year-current_date().getFullYear()>17)){
                toastLog('年龄未设置好，需要设置');
                let month = random(1, 12);
                let day = [1,3,5,7,8,10,12].indexOf(month)!=-1?random(1, 31):(month==2?((current_year % 4 == 0 && current_year % 100 != 0) || current_year % 400 == 0?random(1, 29):random(1,28)):random(1,30));
                set_birthday(random(current_year-38, current_year-18), month, day);//18~38岁
                sleep(1000);
            }
            toastLog('点击进入下一页');
            idEndsWith('ok').textEndsWith('Next').findOne(3000).click();
            sleep(1000);
        }
        if(手机号填写页面.is_active()){
            toastLog('手机号填写页面');
            textMatches(/.*Email/).classNameEndsWith("TextView").findOne(3000).parent().click();
            sleep(1000);
        }
        
        if(邮箱填写页面.is_active()){
            toastLog('邮箱填写页面');
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
                email_edit_text.setText(userinfo['email']);
            }
            sleep(1000);
            textMatches(/.*Next/).classNameEndsWith('TextView').findOne(3000).parent().click();
            sleep(2000);
        }
        if(滑动验证弹窗.is_active()){
            toastLog('拼图验证');
            verify.solve();
            sleep(1000);
        }
        if(旋转验证弹窗.is_active()){
            //在密码填完以后要旋转
            //度数 = 180度
           toastLog('旋转验证');
           sleep(500);
           verify.solve();
           sleep(1000);
        }
        if(密码填写页面.is_active()){
            toastLog('密码填写页面');
            if(textMatches(/.*No internet connection/).exists()){
                toastLog('无网络');
                return false;
            }else if(textMatches(/.*Something went wrong. Try again later./).exists()){
                toastLog('Something went wrong');
            }
            classNameEndsWith('EditText').editable(true).findOne(3000).setText(userinfo['password']);//密码必须有大小写，特殊字符#?!$&@至少8个字符，最多20个字符
            console.info(textMatches(/.*Next/).findOne(3000).parent().click());
            
        }
        if(Google登录弹出.is_active()){
            toastLog('Google登录弹出');
            idEndsWith("cancel").findOne(3000).click();//back();
            sleep(500);
        }
        if(用户名填写页面.is_active()){
            toastLog('用户名填写页面');
            if(textMatches(/.*Add your nickname/).exists()){
                toastLog('填写用户名');
                textMatches(/.*Add your nickname/).findOne(3000).click();
                userinfo['nickname'].split('').forEach(function(a){
                    sleep(random(100, 900));
                    Text(a);
                });
                sleep(800);
            }
            textMatches(/.*Confirm/).findOne(3000).parent().click();
            sleep(800);
            if(textMatches(/.*Slow down.*/).exists()){
                //如果有编辑太快的提示，则直接跳过
                toastLog('跳过，不编辑用户名');
                textMatches(/.*Skip/).clickable(true).findOne(3000).click();
            }
        }
        if(选择兴趣页面.is_active()){
            toastLog('选择兴趣页面');
            for(let i=0; i<5; i++){
                //随机选3个
                nodes = idEndsWith('gop').findOne(3000).children();
                if(random(0, 9) < 6){//80%的概率会点击
                    nodes[random(0, nodes.length-1)].click();
                }
                if(random(0, 9) < 5){//50%的概率会滚动
                    idEndsWith('gop').findOne(3000).scrollForward();
                }
                sleep(800);
            }
            textMatches(/.*Next/).clickable(true).findOne(3000).click();
            sleep(1000);
        }
        if(Swipeup页面.is_active()){
            toastLog('Swipe up页面');
            if(Swipeupformore页面.is_active()){
                toastLog('Swipeupformore页面');
                //sim.random_swipe();
            }
            sml_swipe();
            sleep(800);
            return true;
            //textMatches(/.*Start watching/).findOne(3000).click();
        }
    }
}
//主流程
function main(stp){
    while(1){
        console.info(stp);
        if(stp == '开始'){
            if(currentPackage()=='com.zhiliaoapp.musically'){
                toastLog('在TK界面上,返回桌面，清除数据');
                home();
                wk.clear_data();
                continue;
            }
            stp = '切换IP';
        }
        if(stp == '切换IP'){
            if(switch_ip('192.168.1.176:22999', 24000)){
                stp = '开始注册';
            }
        }
        if(stp == '开始注册'){
            userinfo = get_user();
            console.info(userinfo);
            if(!reg(userinfo)){
                stp = '注册失败';
            }else{
                stp = '注册完成';
            }
            home();
        }
        if(stp == '注册失败'){
            wk.clear_data();//清除缓存并创建新环境
            stp = '开始';
        }
        if(stp == '注册完成'){
            //修改profile;
            wk.change_profile_name(wk.get_profile_path(), userinfo['email']);
            wk.clear_data();//清除缓存并创建新环境
            stp = '开始';
        }
    }
    
}
threads.start(function(){
    //这个线程主要用来处理一些意外的情况
    while(1){
        if(idEndsWith('button1').textContains('Accept').exists()){
            idEndsWith('button1').textContains('Accept').findOne(3000).click();
        }
    }
    
});

main('开始');
/*
userinfo = get_user();
old_path = wk.get_profile_path();
console.info(old_path);
new_name = userinfo['email'].replace(/[^\w]+/g, '_');
console.info(new_name)
wk.change_profile_name(old_path, new_name);
wk.clear_data();
*/
//main('开始');