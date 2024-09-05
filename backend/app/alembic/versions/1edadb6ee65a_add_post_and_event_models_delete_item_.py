"""Add Post and Event models, delete Item model

Revision ID: 1edadb6ee65a
Revises: 1a31ce608336
Create Date: 2024-09-05 15:36:22.106724

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = '1edadb6ee65a'
down_revision = '1a31ce608336'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('event',
    sa.Column('start', sa.DateTime(), nullable=False),
    sa.Column('end', sa.DateTime(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('created_by', sa.Uuid(), nullable=True),
    sa.Column('last_updated', sa.DateTime(), nullable=False),
    sa.Column('updated_by', sa.Uuid(), nullable=True),
    sa.ForeignKeyConstraint(['created_by'], ['user.id'], ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['updated_by'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('post',
    sa.Column('title', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('description', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('content', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('image', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('location', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('is_visible', sa.Boolean(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('created_by', sa.Uuid(), nullable=True),
    sa.Column('last_updated', sa.DateTime(), nullable=False),
    sa.Column('updated_by', sa.Uuid(), nullable=True),
    sa.ForeignKeyConstraint(['created_by'], ['user.id'], ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['updated_by'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('item')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('item',
    sa.Column('description', sa.VARCHAR(length=255), autoincrement=False, nullable=True),
    sa.Column('title', sa.VARCHAR(length=255), autoincrement=False, nullable=False),
    sa.Column('id', sa.UUID(), autoincrement=False, nullable=False),
    sa.Column('owner_id', sa.UUID(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['owner_id'], ['user.id'], name='item_owner_id_fkey', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id', name='item_pkey')
    )
    op.drop_table('post')
    op.drop_table('event')
    # ### end Alembic commands ###
