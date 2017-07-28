class SessionsController < ApplicationController

  def new
    @user = User.new
  end

  def create
    user_params = params.require(:user).permit(:email, :password)
    @user = User.confirm(user_params)
    if @user
      login(@user)
      flash[:notice] = 'Successfully logged in. Welcome back.'
      redirect_to root_path
    else
      flash[:error] = 'Incorrect email or password.'
      redirect_to login_path
    end
  end

  def destroy
    logout
    flash[:notice] = 'Successfully logged out.'
    redirect_to root_path
  end

end
