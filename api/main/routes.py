from main.controllers import *


def load_routes(app):
    app.add_url_rule('/auth/login', view_func=AuthController.login, provide_automatic_options=True, methods=['POST'])
    
    app.add_url_rule('/clients', view_func=ClientController.client_index, provide_automatic_options=True, methods=['GET'])
    app.add_url_rule('/clients', view_func=ClientController.client_create, provide_automatic_options=True, methods=['POST'])
    app.add_url_rule('/clients/<int:client_id>', view_func=ClientController.client_get, provide_automatic_options=True, methods=['GET'])
    app.add_url_rule('/clients/<int:client_id>', view_func=ClientController.client_update, provide_automatic_options=True, methods=['PATCH'])
    app.add_url_rule('/clients/<int:client_id>', view_func=ClientController.client_delete, provide_automatic_options=True, methods=['DELETE'])

    app.add_url_rule('/clients/<int:client_id>/sockets', view_func=SocketController.socket_index, provide_automatic_options=True, methods=['GET'])
    app.add_url_rule('/clients/<int:client_id>/sockets', view_func=SocketController.socket_create, provide_automatic_options=True, methods=['POST'])
    app.add_url_rule('/clients/<int:client_id>/sockets/<int:socket_id>', view_func=SocketController.socket_get, provide_automatic_options=True, methods=['GET'])
    app.add_url_rule('/clients/<int:client_id>/sockets/<int:socket_id>', view_func=SocketController.socket_update, provide_automatic_options=True, methods=['PATCH'])
    app.add_url_rule('/clients/<int:client_id>/sockets/<int:socket_id>', view_func=SocketController.socket_delete, provide_automatic_options=True, methods=['DELETE'])

    app.add_url_rule('/sockets/<int:socket_id>/gauges', view_func=GaugeController.gauge_index, provide_automatic_options=True, methods=['GET'])
    app.add_url_rule('/sockets/<int:socket_id>/gauges', view_func=GaugeController.gauge_create, provide_automatic_options=True, methods=['POST'])
    app.add_url_rule('/sockets/<int:socket_id>/gauges/<int:gauge_id>', view_func=GaugeController.gauge_get, provide_automatic_options=True, methods=['GET'])
    app.add_url_rule('/sockets/<int:socket_id>/gauges/<int:gauge_id>', view_func=GaugeController.gauge_update, provide_automatic_options=True, methods=['PATCH'])
    app.add_url_rule('/sockets/<int:socket_id>/gauges/<int:gauge_id>', view_func=GaugeController.gauge_delete, provide_automatic_options=True, methods=['DELETE'])