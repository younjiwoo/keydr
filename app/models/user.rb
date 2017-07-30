class User < ApplicationRecord
  include ActiveModel::Validations
  validates :first_name, :last_name, :password, length: { maximum: 30 }
  validates :email, presence: true, uniqueness: true, length: { maximum: 100 }

  has_many :gameplays
  has_secure_password

  def self.confirm(params)
    @user = User.find_by({email: params[:email]})
    @user ? @user.authenticate(params[:password]) : false
  end

end
