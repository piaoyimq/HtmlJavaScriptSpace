function getImgList() {
				var fs = require("fs");
				var path = require("path");
				var specificPath= "C:\\Users\\ezhweib\\Pictures\\screenshot";//path.resolve()
				var li = fs.readdirSync(specificPath);
				console.log(li);
				var imgArr = [];
				for(var i = 0; i < li.length; i++) {
					stats = fs.statSync(path.join(specificPath, li[i]));
					if(stats.isFile() && (li[i].indexOf(".jpg") >= 0)) {
						imgArr.push("file:///"+(path.join(specificPath, li[i])));
					}
				}

				console.log(imgArr);
				return imgArr;
			}

			var fileArr = getImgList();

			var index = 0;
			
		
			
			
			function next() {
				index++;
				if(index == fileArr.length) {
					index = 0;
				}
				document.getElementById("pic").style.maxWidth="80%";
				document.getElementById("pic").style.maxHeight="80%";
				document.getElementById("pic").style.zoom=1;
				document.getElementById("pic").src = fileArr[index];
				zoomn = document.getElementById("pic").style.zoom;
				z=parseFloat(zoomn);
				console.log("____next zoom=%d", z)

			}
			

			
			function pre() {
				index--;
				if(index < 0) {
					index = fileArr.length - 1;
				}
				document.getElementById("pic").style.maxWidth="80%";
				document.getElementById("pic").style.maxHeight="80%";
				document.getElementById("pic").style.zoom=1;
				document.getElementById("pic").src = fileArr[index];
				zoomp = document.getElementById("pic").style.zoom;
				z=parseFloat(zoomp);
				console.log("____pre zoom=%d", z)
				
			}
