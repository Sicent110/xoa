define(['app', 'task-item'], function(app, taskItem){
	function _fShowTaskForm(event){
		require(['modal-dialog'], function(modalDialog){
			var categoryId = $(event.delegateTarget).data('id');

			var today = new Date(),
				todayStr = today.getFullYear() + '/' + today.getMonth() + '/' + today.getDate() + ' 18:00';
			var $dialog = modalDialog.build({
				width : 500,
				height : 520,
				title : '新任务',
				content: '<form role="form" class="wrapAddTaskWorker">\
					<div class="form-group">\
						<input type="text" class="form-control J-taskTitle" placeholder="任务标题">\
					</div>\
					<div class="form-group">\
						<textarea class="form-control J-detail" rows="5" placeholder="任务详情，选填"></textarea>\
					</div>\
					<div class="form-group">\
						<button type="button" class="btn btn-success J-btnAddWorker">+负责人</button>\
						<span class="J-wrapWorkerResult"></span>\
					</div>\
					<div class="checkbox warpMembers J-wrapSelectWorkers"></div>\
					<div class="form-group">\
						<button type="button" class="btn btn-success J-btnAddRelatedMember">+相关人员</button>\
						<span class="J-wrapRelatedMembersResult"></span>\
					</div>\
					<div class="checkbox warpMembers J-wrapSelectRelationWorkers"></div>\
					<div class="form-group">\
						<label>完成时间：</label>\n\
						<input class="form-control J-limitTime" type="dateTime-local" value="' + todayStr + '">\
					</div>\
				</form>',
				footer : '<button type="button" class="btn btn-primary J-submit">确定</button>'
			});

			$dialog.__defineGetter__('selectedWorkerIds', function(){
				var ids = [];
				this.find('.J-wrapWorkerResult .J-worker').each(function(){
					ids.push($(this).data('id'));
				});
				return ids;
			});

			$dialog.__defineGetter__('selectedRelatedMemberIds', function(){
				var ids = [];
				this.find('.J-wrapRelatedMembersResult .J-member').each(function(){
					ids.push($(this).data('id'));
				});
				return ids;
			});

			//添加负责人
			$dialog.on('click', '.J-btnAddWorker', function(){
				var $this = $(this);
				var $wrapWorkerResult = $dialog.find('.J-wrapWorkerResult'),
					$wrapMembers = $dialog.find('.J-wrapSelectWorkers');
				if($this.text() == '+负责人'){
					//显示成员选项
					var members = $dialog.data('members');
					if(!members){
						app.ajax({
							url : '/project/' + app.aParams.projectId + '/members.json',
							async : false,
							success : function(aResult){
								$dialog.data('members', aResult.data);
								members = aResult.data;
							}
						});
					}

					//已经选中的负责人ID
					var selectedIds = $dialog.selectedWorkerIds;

					var membersHtml = [];
					for(var i in members){
						var checked = $.inArray(members[i].id, selectedIds) !== -1 ? ' checked' : '';
						membersHtml.push('<label class="J-memberItem"><input class="J-member" type="checkbox" value="' + members[i].id + '"' + checked + '>' + members[i].name + '</label>');
					};
					$wrapMembers.html(membersHtml.join(''));

					$this.text('确定');

				}else{
					//确定负责人成员
					var membersHtml = [];
					$wrapMembers.find(':checkbox').each(function(){
						if(this.checked){
							membersHtml.push('<label class="J-worker" data-id="' + this.value + '">' + $(this).closest('.J-memberItem').text() + '</label>');
						}
					});
					$wrapWorkerResult.html(membersHtml.join('、'));
					$wrapMembers.empty();
					$this.text('+负责人');
				}
			});

			//添加相关人员
			$dialog.on('click', '.J-btnAddRelatedMember', function(){
				var $this = $(this);
				var $wrapWorkerResult = $dialog.find('.J-wrapRelatedMembersResult'),
					$wrapMembers = $dialog.find('.J-wrapSelectRelationWorkers');
				if($this.text() == '+相关人员'){
					//显示成员选项
					var members = $dialog.data('members');
					if(!members){
						app.ajax({
							url : '/project/' + app.aParams.projectId + '/members.json',
							async : false,
							success : function(aResult){
								$dialog.data('members', aResult.data);
								members = aResult.data;
							}
						});
					}

					//已经选中的相关人员ID
					var selectedIds = $dialog.selectedRelatedMemberIds;

					var membersHtml = [];
					for(var i in members){
						var checked = $.inArray(members[i].id, selectedIds) !== -1 ? ' checked' : '';
						membersHtml.push('<label class="J-memberItem"><input class="J-member" type="checkbox" value="' + members[i].id + '"' + checked + '>' + members[i].name + '</label>');
					};
					$wrapMembers.html(membersHtml.join(''));

					$this.text('确定');

				}else{
					//确定负责人成员
					var membersHtml = [];
					$wrapMembers.find(':checkbox').each(function(){
						if(this.checked){
							membersHtml.push('<label class="J-member" data-id="' + this.value + '">' + $(this).closest('.J-memberItem').text() + '</label>');
						}
					});
					$wrapWorkerResult.html(membersHtml.join('、'));
					$wrapMembers.empty();
					$this.text('+相关人员');
				}
			});

			//提交新任务
			$dialog.find('.J-submit').click(function(){
				var title = $dialog.find('.J-taskTitle').val().trim(),
					detail = $dialog.find('.J-detail').val().trim(),
					aWorkerIds = $dialog.selectedWorkerIds,
					aRelatedMemberIds = $dialog.selectedRelatedMemberIds,
					limitTime = $dialog.find('.J-limitTime').val();

				if(!title){
					return alert('请输入任务标题');
				}
				if(!aWorkerIds.length){
					return alert('请选择负责人');
				}

				app.ajax({
					url : '/task/add.do',
					data : {
						title : title,
						detail : detail,
						taskCategoryId : categoryId,
						workerIds : aWorkerIds,
						relatedMemberIds : aRelatedMemberIds,
						limitTime : limitTime
					},
					success : function(aResult){
						app.alert(aResult.message);
						if(aResult.code){
							return;
						}
						
						var $task = taskItem.build(aResult.data);
						self.aTasks[aResult.data.id] = $task;
						var category = self.getTaskCategory(categoryId);
						category.addTask($task);
						$dialog.hide();
					}
				});
			});

			$dialog.show();
		});
	}

	
	function _build(aCategory){
		var $category = $('<div class="col-md-4 taskList J-taskList" data-id="' + aCategory.id + '">\n\
			<h4 class="J-taskCategoryName">\n\
				' + aCategory.name + '\
				<button type="button" class="btn btn-primary J-btnAddTask">+任务</button>\
			</h4>\n\
			<div class="J-listItems">\n\
				\n\
			</div>\
		</div>');

		$category.find('.J-taskCategoryName').hover(function(){
			$(this).find('.J-btnAddTask').show();
		}, function(){
			$(this).find('.J-btnAddTask').hide();
		});

		//弹出添加任务对话框
		$category.on('click', '.J-btnAddTask', _fShowTaskForm);

		//刷新任务列表
		$category.refreshTasks = function(){
			var $itemContainer = this.find('.J-listItems').empty();
			app.ajax({
				url : '/task/' + this.data('id') + '/tasks.json',
				success : function(aResult){
					for(var i in aResult.data){
						var $task = taskItem.build(aResult.data[i]);
						self.aTasks[aResult.data[i].id] = $task;
						$task.css('opacity', 0);
						$itemContainer.append($task);
						$task.animate({opacity:1}, 1000);
					}
				}
			});
		};

		//添加新任务
		$category.addTask = function($task){
			this.find('.J-listItems').append($task);
		};

		//监听拖动任务
		$category.on('dragover', function(event){
			event.preventDefault();
			var dontAppend = $(event.target).hasClass('J-item');
			$category.data('dont_append', dontAppend);
		});
		
		$category.on('drop', function(){
			if(!$category.data('dont_append')){
				self.moveTask(self.$dragingTask, $(this).find('.J-listItems'), true);
			}
			$category.data('dont_append', false);
		});

		//任务详情
		$category.on('click', '.J-item', function(){
			var $task = self.aTasks[$(this).data('id')];
			if(!$task){
				app.alert('找不到任务实例');
				return;
			}
			$task.showDetail();
		});

		return $.extend({
			id : aCategory.id,
			name : aCategory.name,
		}, $category);
	}
	
	function _moveTask($task, $context, isCategoryContext){
		if(isCategoryContext){
			$context.append($task);
		}else{
			$context.before($task);
		}

		var taskId = $task.data('id');
		app.ajax({
			url : '/task/move.do',
			data : {
				taskId : taskId,
				taskCategoryId : $task.closest('.J-taskList').data('id'),
				order : $task.index() + 1
			},
			success : function(aResult){
				if(aResult.code){
					app.alert(aResult.message);
				}
			},
			error : function(){
				app.alert('移动出错，请重新加载页面');
			}
		});

		$task.addClass('dou');
		setTimeout(function(){
			$task.removeClass('dou');
		}, 500);

		self.$dragingTask = null;
	}
	
	var self = {
		build : _build,
		moveTask : _moveTask,
		$dragingTask : null,
		aTaskCategorys : [],
		aTasks : [],
		getTaskCategory : function(id){
			for(var i in this.aTaskCategorys){
				if(this.aTaskCategorys[i].data('id') == id){
					return this.aTaskCategorys[i];
				}
			}
		},
	};
	
	return self;
});