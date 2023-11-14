[`CREATE TABLE public.users (
    id serial4 NOT NULL,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    middle_name varchar(255),
    email varchar(255) NOT NULL,
    brand_name varchar(255),
    logo varchar(255),
    mobile_phone varchar(255) NOT NULL,
    schema_name varchar(255) NOT NULL,
    role varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    otp varchar(255),
    is_active bool NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by varchar(255) NOT NULL DEFAULT ''::character varying,
    updated_by varchar(255) NOT NULL DEFAULT ''::character varying,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT unique_email_mobilePhone UNIQUE (email, mobile_phone)
);
CREATE TABLE public.kyc (
    id serial4 NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    id_proof varchar(255) NOT NULL,
    gst_number varchar(255) NOT NULL,
    bank_account_number varchar(255) NOT NULL,
    bank_account_name varchar(255) NOT NULL,
    bank_branch varchar(255) NOT NULL,
    bank_ifsc_code varchar(255) NOT NULL,
    is_active bool NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by varchar(255) NOT NULL DEFAULT ''::character varying,
    updated_by varchar(255) NOT NULL DEFAULT ''::character varying,
    CONSTRAINT kyc_pkey PRIMARY KEY (id)
);
CREATE TABLE public.components (
    id serial4 NOT NULL,
    title VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
   	is_active bool NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by varchar(255) NOT NULL DEFAULT ''::character varying,
    updated_by varchar(255) NOT NULL DEFAULT ''::character varying,
    CONSTRAINT components_pkey PRIMARY KEY (id)
);
CREATE UNIQUE INDEX components_title ON public.components USING btree (title);
`]