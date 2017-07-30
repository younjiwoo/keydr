class UsersController < ApplicationController
  def new
    @user = User.create
  end

  def create
    @user = User.create(user_params)
    if @user.id
      login(@user)
      redirect_to root_path
    else
      flash[:error] = "#{@user.errors.details[:email][0][:value]} #{@user.errors.messages[:email][0]}"
      redirect_to signup_path
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password)
  end
end
