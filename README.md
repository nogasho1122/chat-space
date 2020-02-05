## messagesテーブル
|Column|Type|constraint|index|
|------|----|----------||
|boby|text|||
|image|string|||
|group_id|references :group|foreign_key: true|○|
|user_id|references :user|foreign_key: true|○|

### Association
- belongs_to :user
- belongs_to :group

## usersテーブル
|Column|Type|Options|index|
|------|----|-------|-|
|name|string|null: false, unique: true|○|
### Association
- has_many :messages
-  has_many :group_members
- has_many :groups, through: :group_members
- 

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|-|
### Association
- has_many :messages
- has_many :group_members
- has_many :users, through: :group_members

## group_membersテーブル
|Column|Type|constraint|index|
|------|----|----------||
|group_id|references :group|foreign_key: true|○|
|user_id|references :user|foreign_key: true|○|
### Association
- belongs_to :user
- belongs_to :group