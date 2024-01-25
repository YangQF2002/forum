class ChangeAuthorToUserId < ActiveRecord::Migration[7.1]
  def change
    change_column :posts, :author, :integer 
    rename_column :posts, :author, :user_id 
  end
end
