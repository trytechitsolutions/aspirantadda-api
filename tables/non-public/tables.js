const nonPublicDDl =[`CREATE TABLE uniqueSchemaName.academy_building (
	id serial4 NOT NULL,
	"name" varchar(255) NOT NULL,
	short_description varchar(255) NOT NULL,
	long_description text NULL,
	logo varchar(255) NOT NULL,
	is_active bool NOT NULL DEFAULT true,
	created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by varchar(255) NOT NULL DEFAULT ''::character varying,
	updated_by varchar(255) NOT NULL DEFAULT ''::character varying,
	CONSTRAINT academy_building_pkey PRIMARY KEY (id)
);
CREATE UNIQUE INDEX academy_building_name ON uniqueSchemaName.academy_building USING btree (name);
CREATE TABLE uniqueSchemaName.roles (
	id serial4 NOT NULL,
    name VARCHAR(255) NOT NULL,
   	is_active bool NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by varchar(255) NOT NULL DEFAULT ''::character varying,
    updated_by varchar(255) NOT NULL DEFAULT ''::character varying,
    CONSTRAINT role_pkey PRIMARY KEY (id)
);
CREATE UNIQUE INDEX roles_name ON uniqueSchemaName.roles USING btree (name);
CREATE TABLE uniqueSchemaName.role_component_mapping (
    role_id INT REFERENCES uniqueSchemaName.roles(id),
    component_id INT REFERENCES public.components(id),
    read bool NOT NULL DEFAULT false,
    write bool NOT NULL DEFAULT false,
	edit bool NOT NULL DEFAULT false,
	delete bool NOT NULL DEFAULT false,
    PRIMARY KEY (role_id, component_id)
);
`];
module.exports={nonPublicDDl}