"""empty message

Revision ID: fa13c5bc6dcc
Revises: 
Create Date: 2021-03-28 22:39:08.043285

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fa13c5bc6dcc'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('images',
    sa.Column('image_id', sa.Integer(), nullable=False),
    sa.Column('image_path', sa.String(), nullable=True),
    sa.Column('image_timestamp', sa.TIMESTAMP(), server_default=sa.text('now()'), nullable=False),
    sa.PrimaryKeyConstraint('image_id')
    )
    op.create_index(op.f('ix_images_image_path'), 'images', ['image_path'], unique=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_images_image_path'), table_name='images')
    op.drop_table('images')
    # ### end Alembic commands ###