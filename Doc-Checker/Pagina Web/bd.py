import pymysql

def conexion():
    return pymysql.connect(host='localhost',
                                user='root',
                                password='root',
                                db='prueba')