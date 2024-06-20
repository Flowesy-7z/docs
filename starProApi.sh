#!/bin/bash
# 定义变量
# 要运行的jar包路径，加不加引号都行。 注意：等号两边 不能 有空格，否则会提示command找不到
JAR_NAME="/usr/local/rule/StarProApi.jar"
# 日志路径，加不加引号都行。 注意：等号两边 不能 有空格，否则会提示command找不到
LOG_PATh=/www/wwwlogs/Rule/RuleApi.log
 
 
# 如果输入格式不对，给出提示！
tips() {
	echo ""
	echo "提示!!!......请使用命令:sh  RuleApi.sh [start|stop|restart|yunxing].   例如: sh RuleApi.sh start  "
	echo ""
	exit 1
}
 
 
# 启动方法
start() {
        # 重新获取一下pid，因为其它操作如stop会导致pid的状态更新
	pid=`ps -ef | grep $JAR_NAME | grep -v grep | awk '{print $2}'`
        # -z 表示如果$pid为空时执行
	if [ -z $pid ]; then
        nohup java -jar $JAR_NAME >out.txt >&1 &
        pid=`ps -ef | grep $JAR_NAME | grep -v grep | awk '{print $2}'`
		echo ""
        echo "服务正在运行，他的pid:${pid}."
		echo "........................服务启动成功！........................."
                                echo "start=....OK!"
                                echo ""
	else
		echo ""
		echo "服务正在运行,他的服务是 pid:${pid}. 如果有必要, 请使用: sh webftp.sh restart.来重启服务"
		echo ""
	fi
}
 
# 停止方法
stop() {
		# 重新获取一下pid，因为其它操作如start会导致pid的状态更新
	pid=`ps -ef | grep $JAR_NAME | grep -v grep | awk '{print $2}'`
        # -z 表示如果$pid为空时执行。 注意：每个命令和变量之间一定要前后加空格，否则会提示command找不到
	if [ -z $pid ]; then
		echo ""
        echo "服务未运行！没有必要阻止它!"
		echo ""
	else
		kill -9 $pid
		echo ""
		echo "服务停止成功！pid:${pid}已被强制杀死！"
		echo "stop=....OK!"
                                echo ""
	fi
}
 
# 输出运行状态方法
yunxing() {
        # 重新获取一下pid，因为其它操作如stop、restart、start等会导致pid的状态更新
	pid=`ps -ef | grep $JAR_NAME | grep -v grep | awk '{print $2}'`
        # -z 表示如果$pid为空时执行。注意：每个命令和变量之间一定要前后加空格，否则会提示command找不到
	if [ -z $pid ];then
		echo ""
        echo "服务没有在运行！"
		echo ""
	else
		echo ""
        echo "服务正在运行！他的pid=${pid}"
		echo ""
	fi
}
 
# 重启方法
restart() {
	echo ""
	echo ".............................重新启动.............................."
	echo ""
		# 重新获取一下pid，因为其它操作如start会导致pid的状态更新
	pid=`ps -ef | grep $JAR_NAME | grep -v grep | awk '{print $2}'`
        # -z 表示如果$pid为空时执行。 注意：每个命令和变量之间一定要前后加空格，否则会提示command找不到
	if [ ! -z $pid ]; then
		kill -9 $pid
	fi
	start
                echo ".........."
	echo "....................重新启动成功..........................."
                echo "restart=....OK!"
                echo ""
}
 
# 根据输入参数执行对应方法，不输入则执行tips提示方法
case "$1" in
   "start")
     start
     ;;
   "stop")
     stop
     ;;
   "yunxing")
     yunxing
     ;;
   "restart")
     restart
     ;;
   *)
     tips
     ;;
esac
