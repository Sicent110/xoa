���� - ��Ϣ
===

- ��ַ: GET `/task/$����ID.json`

- ������

	- `taskId`: ����ID
	
- ���أ�

	```js
	{
		message : '',
		code : 0,
		data : {
			id : 11,
			title : '�������',
			limit_time : '2012-12-12 18:00',
			level : 3,	//���񼶱�
			repeat : 1,	//�ظ�����
			
			workers : [
				//������
				{
					id : 11,
					name : '������1�ƺ�',
					avatar : '/data/worker/avatar/1.jpg'
				},
				{
					id : 22,
					name : '������2�ƺ�',
					avatar : '/data/worker/avatar/2.jpg'
				},
				//������Ա
			],
			
			related_members : [
				//�����Ա
				{
					id : 11,
					name : '�����Ա1�ƺ�',
					avatar : '/data/worker/avatar/1.jpg'
				},
				{
					id : 22,
					name : '�����Ա2�ƺ�',
					avatar : '/data/worker/avatar/2.jpg'
				},
				//������Ա
			],
			
			'history' => [
				//������ʷ�¼�����ϸ����δȷ���������Ȳ���ʾ��ʷ
				{
					id : 1,
					time : 1, //����ʱ��
					type : 1, //�¼�����
					desc : 'KK �޸�����������Ϊ $�������ݵ�ǰ200��', //�¼�����
				}
			],
		}
	}
	```