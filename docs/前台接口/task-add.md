���� - ���
===

- ��ַ��POST `/task/add.do`

- ������

	- `title`��������⣬4��30��

	- `detail`���������飬��ѡ����Ϊ�յ�ʱ�������4��65535��֮��
	
	- `workerIds`��������ID����
	
	- `relatedMemberIds`�������ԱID����
	
	- `limitTime`���������ʱ�䣬ʾ����**2012-12-12 18:00**
	
- ���أ�

	```js
	{
		message : '',
		code : 0,
		data : {
			id : 11,
			title : '�������',
			limit_time : '2012-12-12 18:00',
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
			]
		}
	}
	```