
module.exports = {
	
	do_login:function(fs,u,p){
		
		var obj = this.do_read(fs);
		if (u==null || p==null){
			return {msg:"Invalid data",status:403};
		}
		var text_msg = "";
		var status=false;
		if (!obj[u]) { text_msg ="User not exists"; status = 403; }
		if (status===false && obj[u] && !obj[u].password ) { text_msg ="User doesnt have password"; status = 403; }
		if (status===false && obj[u] && obj[u].password!=p ) { text_msg ="Wrong Password"; status = 403; }
		if (status===false && obj[u] && obj[u].password==p && obj[u].isLoggedIn ) { text_msg ="Welcome!, but user allready connected"; status = 200; }
		if (status===false && obj[u] && obj[u].password==p && !obj[u].isLoggedIn) {
			/* normal login */
			obj[u].isLoggedIn = true;
			text_msg ="Welcome"; status = 200; 
			
			/* update file */
			this.do_write(fs,obj);
		}
		
		return {msg:text_msg,status:status};
		
	},
	
	do_online:function(fs){
		
		var obj = this.do_read(fs);
		var res_line = [];
		for (var _a in obj){
			if (obj[_a].isLoggedIn) res_line.push(_a);
		}
		
		return "<P>"+res_line.join("</P><P>")+"</P>";
		
	},
	
	do_logout:function(fs,u){
		
		var obj = this.do_read(fs);
		if (u==null){
			return {msg:"Invalid data",status:403};
		}
		
		 
		
		var text_msg = "";
		var status=false;
		if (!obj[u]) { text_msg ="User not exists"; status = 403; }
		
		if (status===false && obj[u] &&   !obj[u].isLoggedIn ) { text_msg ="User is not logged in"; status = 200; }
		if (status===false && obj[u] &&   obj[u].isLoggedIn) {
			/* normal login */
			obj[u].isLoggedIn = false;
			text_msg ="Logout out"; status = 200; 
			console.log(obj);
			/* update file */
			this.do_write(fs,obj);
		}
		
		return {msg:text_msg,status:status};
	},
	
	do_write:function(fs,obj){
		var json_obj = JSON.stringify(obj);
		fs.writeFile('customers.json', json_obj, 'utf8', function() {
			
		} );  
	},
	do_read:function(fs){
		
		 
		var obj = fs.readFileSync('customers.json', 'utf8' );
		obj = JSON.parse(obj);
		    
		return obj;
		
	},
	
	
	
	
	
	
}
 