function TaskCategory(t){var a=this;a.id=t.id,a.name=t.name;var e=$('<div class="col-md-4 taskList J-taskList" data-id="'+a.id+'">\n		<h4 class="J-taskCategoryName">\n			'+a.name+'			<button type="button" class="btn btn-primary J-btnAddTask">+任务</button>		</h4>	</div>');return e.find(".J-taskCategoryName").hover(function(){$(this).find(".J-btnAddTask").show()},function(){$(this).find(".J-btnAddTask").hide()}),e.on("click",".J-btnAddTask",function(){var t=new ModalDialog({title:"新任务",content:'<form role="form" class="wrapAddTaskWorker">				<div class="form-group">					<input type="email" class="form-control" placeholder="任务标题">				</div>				<div class="form-group">					<textarea class="form-control" rows="5" placeholder="任务详情"></textarea>				</div>				<div class="form-group">					<button type="button" class="btn btn-success J-btnAddWorker">+负责人</button>										<span class="J-wrapWorkerResult"></span>				</div>				<div class="checkbox warpMembers J-wrapMembers">				</div>							</form>',width:500,height:400,footer:'<button type="button" class="btn btn-primary">确定</button>'});t.on("click",".J-btnAddWorker",function(){var a=$(this),e=t.find(".J-wrapWorkerResult"),s=t.find(".J-wrapMembers");if("+负责人"==a.text()){var r=a.data("members");r||App.ajax({url:"/project/"+App.aParams.projectId+"/members.json",async:!1,success:function(t){$(this).data("members",t.data),r=t.data}});var o=function(){var t=[];return e.find(".J-worker").each(function(){t.push($(this).data("id"))}),t}(),n=[];for(var i in r){var c=-1!==$.inArray(r[i].id,o)?" checked":"";n.push('<label class="J-memberItem"><input class="J-member" type="checkbox" value="'+r[i].id+'"'+c+">"+r[i].name+"</label>")}s.html(n.join("")),a.text("确定")}else{var n=[];s.find(":checkbox").each(function(){this.checked&&n.push('<label class="J-worker" data-id="'+this.value+'">'+$(this).closest(".J-memberItem").text()+"</label>")}),e.html(n.join("、")),s.empty(),a.text("+负责人")}}),t.show()}),$.extend(a,e)}function Task(){}function listenPage(){var t=$("#wrapProjectHead"),a=t.find(".J-btnAddMember");t.hover(function(){a.show()},function(){a.hide()}),a.click(function(){var t=prompt("请输入他的UID，小x会发个加入邀请给他");if(t)return FormatValidator.isInteger(t)?void App.ajax({url:"/project/invite-member.do",data:{projectId:App.aParams.projectId,inviteWorkerId:t.trim()},success:function(t){App.alert(t.message)}}):void App.alert("UID是一个数字 (⊙ｏ⊙) 麻烦叫他进个人信息里看看")})}function showTasks(){App.ajax({url:"/project/"+App.aParams.projectId+"/task-categorys.json",success:function(t){var a=$("#taskCategorys");for(var e in t.data){var s=new TaskCategory(t.data[e]);a.append(s),aCategoryList[s.id]=s}}})}function showProjectInfo(){App.ajax({url:"/project/"+App.aParams.projectId+".json",success:function(t){$("#projectName").text(t.data.name)}})}TaskCategory.prototype.taskList=function(){var t=this;return{addTask:function(a){t.append(a)}}},TaskCategory.prototype.showTasks=function(){var t=this;App.ajax({url:"/project/"+App.aParams.projectId+"/tasks.json",success:function(a){for(var e in a.data){var s=new Task(a.data[e]);console.log(t.taskList),t.taskList.addTask(s)}}})};var aCategoryList={};$(function(){App.loadParam("project/<projectId:\\d+>.htm"),listenPage(),showProjectInfo(),showTasks()});