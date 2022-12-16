FROM nginx:alpine
# Overwrite our configuration file to default one
COPY default.dev.conf /etc/nginx/nginx.conf
COPY default.dev.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]