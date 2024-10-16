"""Add relation between groups and posts

Revision ID: f9dd827d5a2e
Revises: 1466a607b19e
Create Date: 2024-09-09 21:09:07.807871

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = 'f9dd827d5a2e'
down_revision = '1466a607b19e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('post', sa.Column('group_id', sa.Integer(), nullable=False, server_default='1'))
    op.create_foreign_key(None, 'post', 'group', ['group_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'post', type_='foreignkey')
    op.drop_column('post', 'group_id')
    # ### end Alembic commands ###
