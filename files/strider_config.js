#!upstart
description "Strider upstart job"

start on filesystem
stop on shutdown

script
	export PORT=4000
	export DB_URI="mongodb://localhost:27017/strider"
	export SERVER_NAME="http://46.101.209.78:4000"
	export STRIDER_CLONE_DEST="/home/strider/builds/"
	export PLUGIN_GITHUB_APP_ID="your-app-id"
	export PLUGIN_GITHUB_APP_SECRET="your-app-secret"
	echo $$ > /var/run/strider.pid
	exec sudo -u strider \
	DB_URI=$DB_URI SERVER_NAME=$SERVER_NAME
	PLUGIN_GITHUB_APP_ID=$PLUGIN_GITHUB_APP_ID \
	PLUGIN_GITHUB_APP_SECRET=$PLUGIN_GITHUB_APP_SECRET
	PORT=$PORT STRIDER_CLONE_DEST=$STRIDER_CLONE_DEST \
	strider >> /var/log/strider.log 2>&1
end script

pre-start script
	echo "[`date -u +%Y-%m-%dT%T.%3NZ`] (sys) Starting" >> /var/log/strider.log
end script

pre-stop script
	rm /var/run/strider.pid
	echo "[`date -u +%Y-%m-%dT%T.%3NZ`] (sys) Stopping" >> /var/log/strider.log
end script
