//统一配置到constants
var serverurl='/api/mobile-goods-service/ossUploadToAly';
var serverurl1= '/api/mobile-goods-service/ossUploadToAly';

let accessid = '',accesskey = '',host = '',policyBase64 = '',signature = '',callbackbody = '',filename = '',key = ''
,expire = 0
,g_object_name = ''
,g_object_name_type = ''
,now = Date.parse(new Date()) / 1000;

function send_request()
{
    var xmlhttp = null;
    if (window.XMLHttpRequest)
    {
        xmlhttp=new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    {
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (xmlhttp!=null)
    {
        serverUrl = serverurl;
        xmlhttp.open( "GET", serverUrl, false );
        xmlhttp.send( null );
        //alert(xmlhttp.responseText);
        return xmlhttp.responseText
    }
    else
    {
        alert("Your browser does not support XMLHTTP.");
    }
};

function check_object_radio() {
    var tt = document.getElementsByName('myradio');
    for (var i = 0; i < tt.length ; i++ )
    {
        if(tt[i].checked)
        {
            g_object_name_type = tt[i].value;
            break;
        }
    }
}

function get_signature()
{
    //可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
    now = timestamp = Date.parse(new Date()) / 1000;
    if (expire < now + 3)
    {
        body = send_request()
        var obj = eval ("(" + body + ")");
        host = obj['host']
        policyBase64 = obj['policy']
        accessid = obj['accessid']
        signature = obj['signature']
        expire = parseInt(obj['expire'])
        callbackbody = obj['callback']
        key = obj['dir']
        return true;
    }
    return false;
};

function random_string(len) {
　　len = len || 32;
　　var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
　　var maxPos = chars.length;
　　var pwd = '';
　　for (i = 0; i < len; i++) {
    　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function get_suffix(filename) {
    pos = filename.lastIndexOf('.')
    suffix = ''
    if (pos != -1) {
        suffix = filename.substring(pos)
    }
    return suffix;
}

function calculate_object_name(filename)
{
    //alert(filename);
    //if (g_object_name_type == 'local_name')
    //{
    //    g_object_name += "${filename}"
    //}
    //else if (g_object_name_type == 'random_name')
    //{
        suffix = get_suffix(filename)
        g_object_name = key + random_string(10) + suffix
    //}
    return ''
}

function get_uploaded_object_name(filename)
{
    //if (g_object_name_type == 'local_name')
    //{
    //    tmp_name = g_object_name
    //    tmp_name = tmp_name.replace("${filename}", filename);
    //    return tmp_name
    //}
    //else if(g_object_name_type == 'random_name')
    //{
    //    return g_object_name
    //}
    g_object_name_type = 'random_name';
    return g_object_name;
}

function set_upload_param(up, filename, ret)
{
    if (ret == false)
    {
        ret = get_signature()
    }
    g_object_name = key;
    if (filename != '') {
        suffix = get_suffix(filename)
        calculate_object_name(filename)
    }
    //alert(host);
    new_multipart_params = {
        'key' : g_object_name,
        'policy': policyBase64,
        'OSSAccessKeyId': accessid,
        'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
        'callback' : callbackbody,
        'signature': signature,
    };

    up.setOption({
        'url': host,
        'multipart_params': new_multipart_params
    });

    up.start();
}
var uploader = new plupload.Uploader({
	runtimes : 'html5,flash,silverlight,html4',
	browse_button : 'selectfiles2',
    //multi_selection: false,
	container: document.getElementById('container'),
	flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
	silverlight_xap_url : 'lib/plupload-2.1.2/js/Moxie.xap',
    url : 'http://oss.aliyuncs.com',

    filters: {
        mime_types : [ //只允许上传图片和zip,rar文件
        { title : "Image files", extensions : "jpg,gif,png,bmp,jpeg" },
        { title : "Zip files", extensions : "zip,rar" }
        ],
        max_file_size : '10mb', //最大只能上传10mb的文件
        prevent_duplicates : false //不允许选取重复文件
    },

	init: {
		PostInit: function() {
			document.getElementById('ossfile').innerHTML = '';
			//document.getElementById('postfiles').onclick = function() {
            //set_upload_param(uploader, '', false);
            //return false;
			//};

		},

		FilesAdded: function(up, files) {
            var maxLenght=$("#maxImgLenght").val()!=null?$("#maxImgLenght").val():15;
            console.log("点击");
            var i = document.getElementById('uploadimgul').getElementsByTagName('li').length;
            console.log("图片个数："+i);
            //var i = $("#uploadimgul img").length;
            //if($(".rele-title2") && i>=0){//发布页面上传图片
            //    $(".rele-title2").hide();
            //    $(".rele-title1").show();
            //    $(".re-tex").show();
            //    $("#selectfiles2").find("span").addClass("sactive");
            //}

            if(files.length>maxLenght||files.length + i > maxLenght)
            {
                alert('最多只能上传'+maxLenght.toString()+'张');
                for(var m=0;m < files.length;m++){
                    up.files.pop()
                }
                return;
            }
            console.log('files1',files.length);
            console.log('up----',up.files);
            plupload.each(files, function(file) {
				document.getElementById('ossfile').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>'
				+'<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'
				+'</div>';
                //document.getElementById('ossfile').style.display = "none";
                //return false;
			});
            set_upload_param(uploader, '', false);
		},

		BeforeUpload: function(up, file) {
            check_object_radio();
            set_upload_param(up, file.name, true);
        },

		UploadProgress: function(up, file) {
			/*var d = document.getElementById(file.id);
			d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
            var prog = d.getElementsByTagName('div')[0];
			var progBar = prog.getElementsByTagName('div')[0]
			progBar.style.width= 2*file.percent+'px';
			progBar.setAttribute('aria-valuenow', file.percent);*/
		},

		FileUploaded: function(up, file, info) {
            if (info.status == 200)
            {
                //document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = 'upload to oss success, object name:' + get_uploaded_object_name(file.name);
                var liid = get_uploaded_object_name(file.name).replace(".", "");
                html ='<li id=\"'+liid+'\"><div class="upload-main"><a class="up-close" href="javascript:deleteimg(\'' + liid + '\');"></a><img src=\"'+serverurl1+get_uploaded_object_name(file.name)+'?x-oss-process=image/resize,m_fixed,w_112,h_112\"  atsrc=\"'+get_uploaded_object_name(file.name)+'\" /></div></li>';
                $("#uploadimgul").append(html);
                console.log("加载完");

                var i = document.getElementById('uploadimgul').getElementsByTagName('li').length;
                console.log("图片个数："+i);
                //var i = $("#uploadimgul img").length;
                if($(".rele-title2") && i>=0){//发布页面上传图片
                    $(".rele-title2").hide();
                    $(".rele-title1").show();
                    $(".re-tex").show();
                    $("#selectfiles2").find("span").addClass("sactive");
                }
                //if(files.length>=20||files.length+i>=20)
                //{
                //    document.getElementById('hid').style.display="none";
                //    //$("#hid").hide();
                //}
                //if(files.length>20||files.length+i>20)
                //{
                //    alert('最多只能上传20张');
                //    return;
                //}


            }
            else
            {
                document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
            }
		},

		Error: function(up, err) {
            if (err.code == -600) {
                alert("\n选择的文件太大了");
            }
            else if (err.code == -601) {
                alert("\n只允许上传图片");
            }
            else if (err.code == -602) {
                alert("\n这个文件已经上传过一遍了");
            }
            else
            {
                alert("\nError xml:" + err.response);
            }
		}
	}
});

export default{
    uploader
}

