CREATE TABLE Unidad
(
  Clave VARCHAR(20) NOT NULL,
  Nombre VARCHAR(60) NOT NULL,
  Direccion VARCHAR(150) NOT NULL,
  Telefono VARCHAR(10) NOT NULL,
  CorreoE VARCHAR(100) NOT NULL,
  Especialidades VARCHAR(35) NOT NULL,
  Titular VARCHAR(50) NOT NULL,
  PRIMARY KEY (Clave)
);

CREATE TABLE Administrador
(
  IdAdmin INT NOT NULL AUTO_INCREMENT,
  Nombre VARCHAR(20) NOT NULL,
  Apellidos VARCHAR(30) NOT NULL,
  CorreoE VARCHAR(100) NULL,
  Contrasenia VARCHAR(255) NOT NULL,
  PRIMARY KEY (IdAdmin)
);

CREATE TABLE DocCheckerH
(
  IdDCH VARCHAR(15) NOT NULL,
  Clave VARCHAR(20) NOT NULL,
  IdAdmin INT NOT NULL,
  PRIMARY KEY (IdDCH),
  FOREIGN KEY (Clave) REFERENCES Unidad(Clave),
  FOREIGN KEY (IdAdmin) REFERENCES Administrador(IdAdmin)
);

CREATE TABLE Locacion
(
  Estado VARCHAR(20) NOT NULL,
  ContaminacionAire INT NOT NULL,
  ContaminacionAgua INT NOT NULL,
  CalidadDeVida FLOAT NOT NULL,
  Felicidad FLOAT NOT NULL,
  Bienestar INT NOT NULL,
  ContaminacionAuditiva INT NOT NULL,
  Temperatura FLOAT NOT NULL,
  EsperanzaDeVida INT NOT NULL,
  Humedad INT NOT NULL,
  PRIMARY KEY (Estado)
);

CREATE TABLE SignosVitales
(
  IdSi INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (IdSi)
);

CREATE TABLE SignosVitales_Temperatura
(
  Temperatura FLOAT NOT NULL,
  IdSi INT NOT NULL,
  PRIMARY KEY (Temperatura, IdSi),
  FOREIGN KEY (IdSi) REFERENCES SignosVitales(IdSi)
);

CREATE TABLE SignosVitales_Oxigenación
(
  Oxigenación INT NOT NULL,
  IdSi INT NOT NULL,
  PRIMARY KEY (Oxigenación, IdSi),
  FOREIGN KEY (IdSi) REFERENCES SignosVitales(IdSi)
);

CREATE TABLE SignosVitales_FrecuenciaCardiaca
(
  FrecuenciaCardiaca INT NOT NULL,
  IdSi INT NOT NULL,
  PRIMARY KEY (FrecuenciaCardiaca, IdSi),
  FOREIGN KEY (IdSi) REFERENCES SignosVitales(IdSi)
);

CREATE TABLE Doctor
(
  CedulaProf INT NOT NULL,
  Nombre VARCHAR(20) NOT NULL,
  Apellidos VARCHAR(40) NOT NULL,
  CorreoE VARCHAR(100) NOT NULL,
  Contrasenia VARCHAR(255) NOT NULL,
  Sexo VARCHAR(10) NOT NULL,
  FechaNac DATE NOT NULL,
  Especialidad VARCHAR(20) NOT NULL,
  Direccion VARCHAR(150) NOT NULL,
  Telefono1 VARCHAR(10) NOT NULL,
  Telefono2 VARCHAR(10) NOT NULL,
  IdAdmin INT NOT NULL,
  PRIMARY KEY (CedulaProf),
  FOREIGN KEY (IdAdmin) REFERENCES Administrador(IdAdmin)
);

CREATE TABLE Paciente
(
  Nombre VARCHAR(20) NOT NULL,
  Apellidos VARCHAR(20) NOT NULL,
  CURP VARCHAR(18) NOT NULL,
  FechaNac DATE NOT NULL,
  Sexo VARCHAR(10) NOT NULL,
  Telefono1 VARCHAR(10) NOT NULL,
  Telefono2 VARCHAR(10) NOT NULL,
  CorreoE VARCHAR(100) NOT NULL,
  Direccion VARCHAR(150) NOT NULL,
  Estado VARCHAR(20) NOT NULL,
  IdDCH VARCHAR(15) NOT NULL,
  IdSi INT NOT NULL,
  PRIMARY KEY (CURP),
  FOREIGN KEY (Estado) REFERENCES Locacion(Estado),
  FOREIGN KEY (IdDCH) REFERENCES DocCheckerH(IdDCH),
  FOREIGN KEY (IdSi) REFERENCES SignosVitales(IdSi)
);

CREATE TABLE InformePaciente
(
  ExposicionSolar INT NOT NULL,
  VariacionesdeTemperatura INT NOT NULL,
  VariacionesdeHumedad INT NOT NULL,
  ExposicionRuido INT NOT NULL,
  IdInforme INT NOT NULL,
  ActividadFisica INT NOT NULL,
  Educacion VARCHAR(20) NOT NULL,
  HorasDeSuenio INT NOT NULL,
  EstadoCivil VARCHAR(10) NOT NULL,
  PersonasDependientes INT NOT NULL,
  ConsumoDeFarmacos INT NOT NULL,
  CURP VARCHAR(18),
  PRIMARY KEY (IdInforme),
  FOREIGN KEY (CURP) REFERENCES Paciente(CURP)
);

CREATE TABLE Tiene
(
  CedulaProf INT NOT NULL,
  Clave VARCHAR(20) NOT NULL,
  PRIMARY KEY (CedulaProf, Clave),
  FOREIGN KEY (CedulaProf) REFERENCES Doctor(CedulaProf),
  FOREIGN KEY (Clave) REFERENCES Unidad(Clave)
);

CREATE TABLE Atiende
(
  CedulaProf INT NOT NULL,
  CURP VARCHAR(18) NOT NULL,
  PRIMARY KEY (CedulaProf, CURP),
  FOREIGN KEY (CedulaProf) REFERENCES Doctor(CedulaProf),
  FOREIGN KEY (CURP) REFERENCES Paciente(CURP)
);

CREATE TABLE InformePaciente_AntecedentesFam
(
  AntecedentesFam VARCHAR(20) NOT NULL,
  IdInforme INT NOT NULL,
  PRIMARY KEY (AntecedentesFam, IdInforme),
  FOREIGN KEY (IdInforme) REFERENCES InformePaciente(IdInforme)
);

CREATE TABLE InformePaciente_Padecimientos
(
  Padecimientos VARCHAR(20) NOT NULL,
  IdInforme INT NOT NULL,
  PRIMARY KEY (Padecimientos, IdInforme),
  FOREIGN KEY (IdInforme) REFERENCES InformePaciente(IdInforme)
);

CREATE TABLE InformePaciente_Trabajo
(
  Trabajo VARCHAR(20) NOT NULL,
  IdInforme INT NOT NULL,
  PRIMARY KEY (Trabajo, IdInforme),
  FOREIGN KEY (IdInforme) REFERENCES InformePaciente(IdInforme)
);

CREATE TABLE InformePaciente_Adicciones
(
  Adicciones VARCHAR(20) NOT NULL,
  IdInforme INT NOT NULL,
  PRIMARY KEY (Adicciones, IdInforme),
  FOREIGN KEY (IdInforme) REFERENCES InformePaciente(IdInforme)
);

INSERT INTO `Administrador`(`IdAdmin`, `Nombre`, `Apellidos`, `CorreoE`, `Contrasenia`) VALUES (1,'Alexis','Velasco','alexis@gmail.com','1234');
INSERT INTO `Unidad`(`Clave`, `Nombre`, `Direccion`, `Telefono`, `CorreoE`, `Especialidades`, `Titular`) VALUES ('DFIST000073','Gustavo A. Madero','CDMX','5512345678','a@g.com','Muchas','Pedro');